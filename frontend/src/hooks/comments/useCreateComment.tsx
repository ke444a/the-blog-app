import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../services/comments";

type CommentData = {
    content: string;
    postId: string;
    authorId: string;
}

export const useCreateComment = (accessToken: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (comment: CommentData) => createComment(comment, accessToken),
        onSuccess: () => {
            queryClient.invalidateQueries(["comments", "post"]);
        },
    });    
};