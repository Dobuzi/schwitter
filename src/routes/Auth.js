import React from "react";
import AuthForm from "../components/AuthForm";
import SocialAuthForm from "components/SocialAuthForm";

const Auth = () => {
    return (
        <div>
            <AuthForm />
            <SocialAuthForm />
        </div>
    );
};

export default Auth;
