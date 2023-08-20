import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";

const getAllPosts = async (
    page: number,
): Promise<{ page: number; totalPages: number; posts: IPost[] }> => {
    const response = await api.get(`/posts/?page=${page}`);
    return response.data;
};

export const useGetAllPostsQuery = () => {
    return useInfiniteQuery({
        queryKey: ["posts", "all"],
        queryFn: ({ pageParam = 1 }) => getAllPosts(pageParam),
        getNextPageParam: (lastPage) =>
            lastPage.totalPages <= lastPage.page
                ? undefined
                : Number(lastPage.page) + 1,
    });
};
