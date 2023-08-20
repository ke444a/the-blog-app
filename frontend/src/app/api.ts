import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.PROD
        ? import.meta.env.VITE_BACKEND_SERVER_PROD
        : "http://localhost:5000",
    withCredentials: true,
});
