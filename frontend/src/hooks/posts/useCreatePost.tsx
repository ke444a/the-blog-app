import { useMutation } from "@tanstack/react-query";
import { createNewPost } from "../../services/posts";

export const useCreatePost = (onSuccessFunc: () => void) => {
    return useMutation({
        mutationFn: (postData: FormData) => createNewPost(postData),
        onSuccess: onSuccessFunc,
    });
};