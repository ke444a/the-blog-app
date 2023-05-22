import { useQuery } from "@tanstack/react-query";
import { getUserByUsername } from "../../services/users";

export const useGetUser = (username: string, accessToken: string) => {
    const QUERY_KEYS = ["users", username];

    return useQuery({
        queryKey: QUERY_KEYS,
        queryFn: () => getUserByUsername(username, accessToken)
    });
};