import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
    const Logging = () => {
        if (props.user === null) {
            return (
                <div>
                    <Link to={"/login"} className="nav-link">
                        Login
                    </Link>
                </div>
            );
        } else {
            return (
                <div>
                    <Link
                        onClick={props.onClick}
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                    >
                        <span>&#8594;</span> Logout {props.user.name}
                    </Link>
                </div>
            );
        }
    };
    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container">
                    <a href="/restaurants" className="navbar-brand">
                        Restaurant Reviews
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/restaurants"} className="nav-link">
                                Restaurants
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Logging />
                        </li>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
