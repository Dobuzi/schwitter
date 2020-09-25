import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faUser } from "@fortawesome/free-solid-svg-icons";

import "../style/nav.css";

const Navigation = ({ userObj }) => {
    return (
        <nav>
            <ul className="nav-ul">
                <li>
                    <Link to="/" className="linkHome">
                        <span className="nav__logo"><FontAwesomeIcon
                            icon={faFire}
                            color={"#a29bfe"}
                            size="2x"
                        />pAAng!</span>
                    </Link>
                </li>
                <li>
                    <Link to="/profile" className="linkProfile">
                        <FontAwesomeIcon
                            icon={faUser}
                            color={"#ffeaa7"}
                            size="2x"
                        />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
