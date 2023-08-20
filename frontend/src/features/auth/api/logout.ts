import { useQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { logout as logoutRedux } from "../slices/authSlice";

const logout = (): Promise<void> => {
    return api.get("/auth/logout");
};

export const useLogoutQuery = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useQuery({
        queryKey: ["auth", "logout"],
        queryFn: logout,
        enabled: false,
        onSuccess: () => dispatch(logoutRedux()),
    });
};
