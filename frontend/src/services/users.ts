import { customAxios } from "./api/customAxios";

export const getUserById = (userId: string, accessToken: string) => {
    return customAxios.get(`/users/${userId}/`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }).then((response) => response.data);
};

export const updateUser = (data: FormData, userId: string, accessToken: string) => {
    return customAxios.put(`/users/${userId}/`, data, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
        }
    }).then((response) => response.data);
};
