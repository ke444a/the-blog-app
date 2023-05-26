import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/users";

export const useGetUser = (userId: string, accessToken: string) => {
    const QUERY_KEYS = ["users", "user", userId];

    return useQuery({
        queryKey: QUERY_KEYS,
        queryFn: () => getUserById(userId, accessToken),
    });
};