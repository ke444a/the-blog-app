import { api } from "../../../app/api";
import { useQuery } from "@tanstack/react-query";

const getPostComments = async (postId: string): Promise<IComment[]> => {
    const response = await api.get(`/comments/post/${postId}`);
    return response.data;
};

export const usePostCommentsQuery = (postId: string) => {
    return useQuery({
        queryKey: ["comments", "post", postId],
        queryFn: () => getPostComments(postId),
    });
};
