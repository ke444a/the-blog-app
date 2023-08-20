import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../services/comments";
import { toast } from "react-toastify";

interface CommentData {
    content: string;
    postId: string;
    authorId: string;
}

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (comment: CommentData) => createComment(comment),
        onSuccess: () => {
            queryClient.invalidateQueries(["comments", "post"]);
            toast.success("Comment has been created");
        },
    });    
};