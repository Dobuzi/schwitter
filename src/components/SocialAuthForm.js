import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { authService, firebaseInstance } from "../fbase";

import "../style/socialAuthForm.css";

const SocialAuthForm = ({ newAccount }) => {
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithRedirect(provider);
        authService.getRedirectResult().then((result) => {
            if (result.credential) {
                const token = result.credential.accessToken;
                console.log(token)
            }
            const user = result.user;
            console.log(user)
        }).catch((error) => {
            console.log(error.message);
        })
    };
    return (
        <>
            {!newAccount && (<div className="authBtns">
                <button
                    onClick={onSocialClick}
                    name="google"
                    className="authBtn"
                >
                    <FontAwesomeIcon icon={faGoogle} size="2x" color="#4885ed" />
                </button>
                <button
                    onClick={onSocialClick}
                    name="github"
                    className="authBtn"
                >
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                </button>

            </div>)}
        </>
    );
};

export default SocialAuthForm;
