import { customAxios } from "./api/customAxios";

export const getUserById = (userId: string) => {
    return customAxios.get(`/users/${userId}/`).then((response) => response.data);
};

export const updateUser = (data: FormData, userId: string) => {
    return customAxios.patch(`/users/${userId}/`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then((response) => response.data);
};
