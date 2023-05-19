import { customAxios } from "./api/customAxios";

export const createNewPost = (data: FormData, accessToken: string) => {
    return customAxios.post("/posts/", data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${accessToken}`
        }
    }).then((response) => response.data);
};

export const getAllPosts = (accessToken: string) => {
    return customAxios.get("/posts/",{
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }).then((response) => response.data);
};
