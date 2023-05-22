import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/users";

export const useGetAuthor = (authorId: string, accessToken: string) => {
    const QUERY_KEYS = ["users", "author", authorId];

    return useQuery({
        queryKey: QUERY_KEYS,
        queryFn: () => getUserById(authorId, accessToken),
    });
};