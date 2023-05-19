import { customAxios } from "./api/customAxios";

export const getUser = (userId: string, accessToken: string) => {
    return customAxios.get(`/users/${userId}/`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }).then((response) => response.data);
};
