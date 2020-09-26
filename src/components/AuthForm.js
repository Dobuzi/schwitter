import React, { useState } from "react";
import { authService } from "../fbase";

import "../style/authForm.css";

const AuthForm = ({ newAccount, setNewAccount, refreshUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [error, setError] = useState("");

    const actionCodeSettings = {
        url: 'https://dobuzi.github.io/schwitter',
        handleCodeInApp: true,
    }
    const signInWithEmailLink = async () => {
        try {
            await authService.sendSignInLinkToEmail(email, actionCodeSettings)
            window.localStorage.setItem('emailForSignIn', email);
        } catch (error) {
            setError(error.message)
        }
        if (authService.isSignInWithEmailLink(window.location.href)) {
            const email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                window.prompt('Please provide your email for confirmation');
            }
            authService.signInWithEmailLink(email, window.location.href).then((result) => {
                window.localStorage.removeItem('emailForSignIn');
            }).catch((error) => {
                console.log(error.message);
            })
        }
    }

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "passwordCheck") {
            setPasswordCheck(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newAccount) {
                if (password === passwordCheck) {
                    authService.createUserWithEmailAndPassword(
                        email,
                        password
                    ).then(() => {
                        let user = authService.currentUser;
                        user.sendEmailVerification(actionCodeSettings).then(() => {
                            setError("You can sign in after verifying your email.")
                            authService.signOut();
                        }).catch((error) => {
                            setError(error.message)
                        })
                    });
                } else {
                    setError("The passwords are not the same.");
                }
            } else {
                await authService.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => {
        setNewAccount((prev) => !prev)
        setVerifyEmail(false);
    };
    const toggleVerifyEmail = () => setVerifyEmail((prev) => !prev);
    return (
        <>
            <form onSubmit={verifyEmail ? signInWithEmailLink : onSubmit} className="container">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                    className="authInput"
                />
                {!verifyEmail && <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                    className="authInput"
                />}
                {newAccount && (<input
                    name="passwordCheck"
                    type="password"
                    placeholder="Repeat password"
                    required
                    value={passwordCheck}
                    onChange={onChange}
                    className="authInput"
                />)}
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "Sign In"}
                    className="authInput authSubmit"
                />
                {error && <span className="authError">{error}</span>}
            </form>
            <div className="authSwitchContainer">
                <span onClick={toggleAccount} className="authSwitch">
                    {newAccount ? "Sign In" : "Create Account"}
                </span>
                {!newAccount && <span onClick={toggleVerifyEmail} className="authSwitch">
                    {verifyEmail ? "Sign in with email and Password" : "Sign in by verifying email"}
                </span>
                }
            </div>
        </>
    );
};

export default AuthForm;
