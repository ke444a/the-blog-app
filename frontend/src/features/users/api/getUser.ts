import { api } from "../../../app/api";
import { useQuery } from "@tanstack/react-query";

const getUser = async (userId: string): Promise<IUser> => {
    const response = api.get(`/users/${userId}`);
    return (await response).data;
};

export const useGetUserQuery = (userId: string) => {
    return useQuery({
        queryKey: ["users", "user", userId],
        queryFn: () => getUser(userId),
    });
};
