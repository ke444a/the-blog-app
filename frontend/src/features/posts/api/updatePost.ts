import { useMutation } from "@tanstack/react-query";
import { api } from "../../../app/api";
import { toast } from "react-toastify";

const updatePost = async (postId: string, data: FormData): Promise<IPost> => {
    const response = await api.patch(`/posts/${postId}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const useUpdatePostMutation = (postId: string) => {
    return useMutation({
        mutationFn: (data: FormData) => updatePost(postId, data),
        onSuccess: () => {
            toast.success("Post has been successfully updated");
        },
    });
};
