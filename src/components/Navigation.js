import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => {
    return (
        <nav>
            <ul className="nav-ul">
                <li>
                    <Link to="/" className="linkHome">
                        <FontAwesomeIcon
                            icon={faTwitter}
                            color={"#04AAFF"}
                            size="2x"
                        />
                    </Link>
                </li>
                <li>
                    <Link to="/profile" className="linkProfile">
                        <FontAwesomeIcon
                            icon={faUser}
                            color={"#04AAFF"}
                            size="2x"
                        />
                        <span className="linkProfileWord">
                            {userObj.displayName
                                ? `${userObj.displayName}'s Profile`
                                : "Profile"}
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
