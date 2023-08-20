import { customAxios } from "./api/customAxios";

export const getPostComments = (postId: string) => {
    return customAxios.get(`/comments/post/${postId}`).then((response) => response.data);
};

export const createComment = (comment: {postId: string, authorId: string, content: string}) => {
    return customAxios.post("/comments/", comment).then((response) => response.data);
};
