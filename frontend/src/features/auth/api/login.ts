import { useMutation } from "@tanstack/react-query";
import { api } from "../../../app/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

type ILoginCredentials = {
    username: string;
    password: string;
};

const login = async (
    credentials: ILoginCredentials,
): Promise<{ user: IUser }> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
};

export const useLoginMutation = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (formData: ILoginCredentials) => login(formData),
        onSuccess: (data) => {
            dispatch(setCredentials({ user: data.user }));
            navigate("/");
        },
    });
};
