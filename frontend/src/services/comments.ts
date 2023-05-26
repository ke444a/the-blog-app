import { customAxios } from "./api/customAxios";

export const getPostComments = (postId: string, accessToken: string) => {
    return customAxios.get(`/comments/post/${postId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then((response) => response.data);
};

export const createComment = (comment: {postId: string, authorId: string, content: string}, accessToken: string) => {
    return customAxios.post("/comments/", comment, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then((response) => response.data);
};
