import { useQuery } from "@tanstack/react-query";
import { getPostComments } from "../../services/comments";

export const usePostComments = (postId: string, accessToken: string) => {
    const QUERY_KEYS = ["comments", "post", postId];

    return useQuery({
        queryKey: QUERY_KEYS,
        queryFn: () => getPostComments(postId, accessToken),
    });
};