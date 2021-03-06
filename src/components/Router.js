import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

import "../style/router.css";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <div className="router__container">
                            <Route exact path="/">
                                <Home userObj={userObj} />
                            </Route>
                            <Route exact path="/profile">
                                <Profile
                                    userObj={userObj}
                                    refreshUser={refreshUser}
                                />
                            </Route>
                        </div>
                    </>
                ) : (
                        <>
                            <Route exact path="/">
                                <Auth refreshUser={refreshUser} />
                            </Route>
                        </>
                    )}
            </Switch>
        </Router>
    );
};

export default AppRouter;
