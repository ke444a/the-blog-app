import { customAxios } from "./api/customAxios";

export const likePost = (data: { userId: string, postId: string}) => {
    return customAxios.post("/posts/like/", data).then((response) => response.data);
};

export const dislikePost = (data: { userId: string, postId: string}) => {
    return customAxios.post("/posts/dislike/", data).then((response) => response.data);
};

export const checkUserLike = (userId: string, postId: string) => {
    return customAxios.get(`/posts/user/likes/?userId=${userId}&postId=${postId}`).then((response) => response.data);
};
