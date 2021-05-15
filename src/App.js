import React from "react";
import { Switch, Link, Route } from "react-router-dom";
import RestaurantsList from "./components/restaurants-list";
import AddReview from "./components/add-review";
import Login from "./components/login";
import Restaurant from "./components/restaurant";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    const [user, setUser] = React.useState(null);

    async function login(user = null) {
        setUser(user);
    }

    async function logout() {
        setUser(user);
    }

    return (
        <div>
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
                            {user ? (
                                <Link
                                    onClick={logout}
                                    className="nav-link"
                                    style={{ cursor: "pointer" }}
                                >
                                    Logout {user.name}
                                </Link>
                            ) : (
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            )}
                        </li>
                    </div>
                </div>
            </nav>
            <div className="container mt-3">
                <Switch>
                    <Route
                        exact
                        path={["/", "/restaurants"]}
                        component={RestaurantsList}
                    />
                    <Route
                        path="/restaurants/:id/review"
                        render={(props) => <AddReview {...props} user={user} />}
                    />
                    <Route
                        path="/restaurants/:id"
                        render={(props) => (
                            <Restaurant {...props} user={user} />
                        )}
                    />
                    <Route
                        path="/login"
                        render={(props) => <Login {...props} login={login} />}
                    />
                </Switch>
            </div>
        </div>
    );
}

export default App;
