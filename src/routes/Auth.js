import React from "react";
import AuthForm from "../components/AuthForm";
import SocialAuthForm from "components/SocialAuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                className="auth__icon"
            />
            <AuthForm />
            <SocialAuthForm />
        </div>
    );
};

export default Auth;
