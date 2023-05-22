import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/posts";

export const useGetAllPosts = (accessToken: string) => {
    const QUERY_KEYS = ["posts", "all"];

    return useQuery({
        queryKey: QUERY_KEYS,
        queryFn: () => getAllPosts(accessToken),
    });
};
