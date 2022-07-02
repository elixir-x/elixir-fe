import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:3001/api/v1",
    withCredentials: true,
    headers: {
        "Content-type": "application/json"
    }
});
