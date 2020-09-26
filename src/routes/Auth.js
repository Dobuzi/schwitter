import React, { useState } from "react";

import AuthForm from "../components/AuthForm";
import SocialAuthForm from "components/SocialAuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

import "../style/auth.css";

const Auth = ({ refreshUser }) => {
    const [newAccount, setNewAccount] = useState(false);
    const onClick = () => {
        window.location.reload();
    }
    return (
        <div className="authContainer">
            <span onClick={onClick} className="auth__logo">
                <FontAwesomeIcon
                    icon={faFire}
                    color="#a29bfe"
                    size="2x"
                />
            pang!</span>
            <AuthForm
                newAccount={newAccount}
                setNewAccount={setNewAccount}
                refreshUser={refreshUser}
            />
            <SocialAuthForm newAccount={newAccount} />
        </div>
    );
};

export default Auth;
