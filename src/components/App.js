import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

import "../style/app.css"

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj({
                    displayName: user.displayName ? user.displayName : user.email.split("@")[0],
                    uid: user.uid,
                    emailVerified: user.emailVerified,
                    updateProfile: (args) => user.updateProfile(args),
                });
            } else {
                setUserObj(null);
            }
            setInit(true);
        });
    }, []);
    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            emailVerified: user.emailVerified,
            updateProfile: (args) => user.updateProfile(args),
        });
    };
    return (
        <>
            {init ? (
                <AppRouter
                    refreshUser={refreshUser}
                    isLoggedIn={Boolean(userObj && userObj.emailVerified)}
                    userObj={userObj}
                />
            ) : (
                    <div className="loading__container">
                        <span className="loading">Loading...</span>
                    </div>
                )}
            <footer>&copy; {new Date().getFullYear()} Pang!</footer>
        </>
    );
}

export default App;
