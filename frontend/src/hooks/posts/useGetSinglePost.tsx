import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../../services/posts";

export const useGetSinglePost = (postId: string) => {
    const QUERY_KEYS = ["posts", "single", postId];

    return useQuery({
        queryKey: QUERY_KEYS,
        queryFn: () => getSinglePost(postId),
    });
};