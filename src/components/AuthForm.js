import React, { useState } from "react";
import { authService } from "../fbase";

import "../style/authForm.css";

const AuthForm = ({ newAccount, setNewAccount }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [error, setError] = useState("");
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
                    await authService.createUserWithEmailAndPassword(
                        email,
                        password
                    );
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
    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                    className="authInput"
                />
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
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </>
    );
};

export default AuthForm;
