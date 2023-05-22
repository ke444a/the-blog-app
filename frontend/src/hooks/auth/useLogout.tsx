import { useQuery } from "@tanstack/react-query";
import { logoutUser } from "../../services/auth";

export const useLogout = (onSuccessFunc: () => void) => {
    const QUERY_KEYS = ["auth", "logout"];

    return useQuery({
        queryKey: QUERY_KEYS,
        queryFn: logoutUser,
        enabled: false,
        onSuccess: () => onSuccessFunc()
    });
};