import { faFacebook, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
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
        } else if (name === "facebook") {
            provider = new firebaseInstance.auth.FacebookAuthProvider();
        }
        await authService.signInWithPopup(provider);
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
                    name="facebook"
                    className="authBtn"
                >
                    <FontAwesomeIcon icon={faFacebook} size="2x" color="#3b5998" />
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
