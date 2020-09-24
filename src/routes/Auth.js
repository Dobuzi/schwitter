import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import SocialAuthForm from "components/SocialAuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

import "../style/auth.css";

const Auth = () => {
    const [newAccount, setNewAccount] = useState(false);
    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faFire}
                color={"#a29bfe"}
                size="3x"
                className="auth__icon"
            />
            <AuthForm newAccount={newAccount} setNewAccount={setNewAccount} />
            <SocialAuthForm newAccount={newAccount} />
        </div>
    );
};

export default Auth;
