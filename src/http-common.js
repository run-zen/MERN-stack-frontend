import axios from "axios";

export default axios.create({
    baseURL: "https://runzens-org-api.herokuapp.com/api/v1/restaurants",
    headers: {
        "Content-type": "application/json",
    },
});
