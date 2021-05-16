import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RestaurantData from "../views/restaurant";

function RestaurantsList() {
    const [restaurants, setRestaurants] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchZip, setSearchZip] = useState("");
    const [searchCuisine, setSearchCuisine] = useState("");
    const [cuisines, setCuisines] = useState(["All Cuisines"]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        retrieveRestaurants();
        retrieveCuisines();
    }, []);

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const onChangeSearchZip = (e) => {
        const searchZip = e.target.value;
        setSearchZip(searchZip);
    };

    const onChangeSearchCuisine = (e) => {
        const searchCuisine = e.target.value;
        setSearchCuisine(searchCuisine);
    };

    const retrieveRestaurants = async () => {
        try {
            const { data } = await RestaurantData.getAll();
            setLoading(true);
            setRestaurants(data.restaurants);
        } catch (e) {
            console.error(e);
        }
        // RestaurantData.getAll()
        //     .then((response) => {
        //         console.log(response.data);
        //         setRestaurants(response.data.restaurants);
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     });
    };

    const retrieveCuisines = () => {
        RestaurantData.getCuisines()
            .then((response) => {
                console.log(response.data);
                setCuisines(["All Cuisines"].concat(response.data));
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveRestaurants();
    };

    const find = (query, by) => {
        RestaurantData.find(query, by)
            .then((response) => {
                console.log(response.data);
                setRestaurants(response.data.restaurants);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const findByName = () => {
        find(searchName, "name");
    };

    const findByZip = () => {
        find(searchZip, "zipcode");
    };

    const findByCuisine = () => {
        if (searchCuisine === "All Cuisines") {
            refreshList();
        } else {
            find(searchCuisine, "cuisine");
        }
    };

    function RestaurantDisplay() {
        return restaurants.map((restaurant) => {
            const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
            return (
                <div className="col-lg-4 pb-1">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{restaurant.name}</h5>
                            <p className="card-text">
                                <strong>Cuisine: </strong>
                                {restaurant.cuisine}
                                <br />
                                <strong>Address: </strong>
                                {address}
                            </p>
                            <div className="row">
                                <Link
                                    to={"/restaurants/" + restaurant._id}
                                    className="btn btn-primary col-lg-5 mx-1 mb-1"
                                >
                                    View Reviews
                                </Link>
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href={
                                        "https://www.google.com/maps/place/" +
                                        address
                                    }
                                    className="btn btn-primary col-lg-5 mx-1 mb-1"
                                >
                                    View Map
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    return (
        <div>
            <div className="row pb-3">
                <div className="col-md-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                            value={searchName}
                            onChange={onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={findByName}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by zip"
                            value={searchZip}
                            onChange={onChangeSearchZip}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={findByZip}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="input-group">
                        <select onChange={onChangeSearchCuisine}>
                            {cuisines.map((cuisine) => {
                                return (
                                    <option value={cuisine}>
                                        {" "}
                                        {cuisine.substr(0, 20)}{" "}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={findByCuisine}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {loading ? (
                    <RestaurantDisplay />
                ) : (
                    <div class="d-flex justify-content-center mt-5">
                        <div class="spinner-border" role="status">
                            <span class="sr-only"></span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RestaurantsList;
