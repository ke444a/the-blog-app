import { useMutation } from "@tanstack/react-query";
import { updatePost } from "../../services/posts";

export const useUpdatePost = (postId: string, accessToken: string, onSuccessFunc: () => void) => {
    return useMutation({
        mutationFn: (data: FormData) => updatePost(postId, data, accessToken),
        onSuccess: onSuccessFunc
    });
};
