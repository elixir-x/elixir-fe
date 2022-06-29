import axios from "axios";

export default axios.create({
    baseURL: "https://127.0.0.1:3001/api/v1",
    withCredentials: true,
    headers: {
        "Content-type": "application/json"
    }
});
