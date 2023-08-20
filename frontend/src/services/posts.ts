import { customAxios } from "./api/customAxios";

export const createNewPost = (data: FormData) => {
    return customAxios.post("/posts/", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then((response) => response.data);
};

export const getAllPosts = (page: number) => {
    return customAxios.get(`/posts/?page=${page}`).then((response) => response.data);
};

export const getSinglePost = (postId: string) => {
    return customAxios.get(`/posts/${postId}`).then((response) => response.data);
};

export const getPostsByAuthor = (authorId: string) => {
    return customAxios.get(`/posts/author/${authorId}`).then((response) => response.data);
};

export const updatePost = (postId: string, data: FormData) => {
    return customAxios.patch(`/posts/${postId}`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then((response) => response.data);
};
