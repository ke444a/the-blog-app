import axios from "axios";
import { refreshToken } from "../auth";
import { store } from "../../app/store";
import { setCredentials } from "../../features/auth/authSlice";

export const customAxios = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});

// customAxios.interceptors.request.use(
//     (config) => {
//         const accessToken = store.getState().auth.token;
//         if (accessToken) {
//             config.headers["Authorization"] = `Bearer ${accessToken}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

customAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            const res = await refreshToken();
            const accessToken = res?.accessToken;
            if (accessToken) {
                store.dispatch(setCredentials({user: store.getState().auth.user, accessToken}));
                customAxios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            }
            return customAxios(originalRequest);
        }

        return Promise.reject(error);
    }
);
