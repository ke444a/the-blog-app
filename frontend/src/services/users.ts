import { customAxios } from "./api/customAxios";

export const getUserById = (userId: string, accessToken: string) => {
    return customAxios.get(`/users/${userId}/`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }).then((response) => response.data);
};

export const getUserByUsername = (username: string, accessToken: string) => {
    return customAxios.get(`/users/username/${username}/`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }).then((response) => response.data);
};
