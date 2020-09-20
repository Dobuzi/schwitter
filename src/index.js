import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./style/base.css";
import "./style/auth.css";
import "./style/authForm.css";
import "./style/socialAuthForm.css";
import "./style/factory.css";
import "./style/home.css";
import "./style/nav.css";
import "./style/profile.css";
import "./style/router.css";
import "./style/pang.css";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
