import React from "react";
import { Switch, Route } from "react-router-dom";
import RestaurantsList from "./components/restaurants-list";
import AddReview from "./components/add-review";
import Login from "./components/login";
import Restaurant from "./components/restaurant";
import Header from "./components/Header";
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
            <Header user={user} onclick={logout} />
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
