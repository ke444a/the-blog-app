import { customAxios } from "./api/customAxios";

export const loginUser = (data: UserLoginCredentials) => {
    return customAxios.post("/auth/login/", data).then((response) => response.data);
};

export const registerUser = (data: FormData) => {
    return customAxios.post("/auth/register/", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then((response) => response.data);
};

export const refreshToken = () => {
    return customAxios.get("/auth/refresh/").then((response) => response.data);
};

export const logoutUser = () => {
    return customAxios.get("/auth/logout/");
};
