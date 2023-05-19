import { customAxios } from "./api/customAxios";

export const loginUser = (data: any) => {
    return customAxios.post("/auth/login/", data).then((response) => response.data);
};

export const refreshToken = () => {
    return customAxios.get("/auth/refresh/").then((response) => response.data);
};