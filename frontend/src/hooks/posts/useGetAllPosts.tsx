import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/posts";

export const useGetAllPosts = () => {
    const QUERY_KEYS = ["posts", "all"];

    return useInfiniteQuery({
        queryKey: QUERY_KEYS,
        queryFn: ({ pageParam = 1}) => getAllPosts(pageParam),
        getNextPageParam: (lastPage) => lastPage.totalPages === lastPage.page ? undefined: lastPage.page + 1
    });
};
