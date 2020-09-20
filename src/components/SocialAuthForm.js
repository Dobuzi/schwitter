import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { authService, firebaseInstance } from "../fbase";

const SocialAuthForm = () => {
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
        await authService.signInWithPopup(provider);
    };
    return (
        <>
            <div className="authBtns">
                <button
                    onClick={onSocialClick}
                    name="google"
                    className="authBtn"
                >
                    Sign in with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button
                    onClick={onSocialClick}
                    name="github"
                    className="authBtn"
                >
                    Sign in with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </>
    );
};

export default SocialAuthForm;
