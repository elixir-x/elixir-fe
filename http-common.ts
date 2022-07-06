import axios from "axios";

export default axios.create({
    baseURL: import.meta.env.ELIXIR_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-type": "application/json"
    }
});
