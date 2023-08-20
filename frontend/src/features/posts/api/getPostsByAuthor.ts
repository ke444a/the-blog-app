import { useQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";

const getPostsByAuthor = async (authorId: string): Promise<IPost[]> => {
    const response = await api.get(`/posts/author/${authorId}`);
    return response.data;
};

export const useGetPostsByAuthorQuery = (authorId: string) => {
    return useQuery({
        queryKey: ["posts", authorId],
        queryFn: () => getPostsByAuthor(authorId),
    });
};
