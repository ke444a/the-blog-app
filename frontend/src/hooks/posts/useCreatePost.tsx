import { useMutation } from "@tanstack/react-query";
import { createNewPost } from "../../services/posts";

export const useCreatePost = (accessToken: string, onSuccessFunc: () => void) => {
    return useMutation({
        mutationFn: (postData: FormData) => createNewPost(postData, accessToken),
        onSuccess: onSuccessFunc
    });
};