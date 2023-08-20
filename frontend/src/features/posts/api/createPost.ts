import { api } from "../../../app/api";
import { useMutation } from "@tanstack/react-query";

const createPost = async (data: FormData): Promise<IPost> => {
    const response = await api.post("/posts", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const useCreatePostMutation = () => {
    return useMutation({
        mutationFn: (postData: FormData) => createPost(postData),
    });
};
