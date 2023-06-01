import { useQuery } from "@tanstack/react-query";
import { getPostsByAuthor } from "../../services/posts";

export const useGetPostsByUser = (authorId: string) => {
    const QUERY_KEYS = ["posts", authorId];

    return useQuery({
        queryKey: QUERY_KEYS,
        queryFn: () => getPostsByAuthor(authorId),
    });
};