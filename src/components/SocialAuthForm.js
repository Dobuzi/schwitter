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
            <div>
                <button onClick={onSocialClick} name="google">
                    Sign in with Google
                </button>
                <button onClick={onSocialClick} name="github">
                    Sign in with Github
                </button>
            </div>
        </>
    );
};

export default SocialAuthForm;
