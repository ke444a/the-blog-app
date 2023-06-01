import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/auth";

export const useLogin = (onSuccessFunc: (data: IUserStoreData) => void) => {
    return useMutation({
        mutationFn: (formData: IUserLoginCredentials) => loginUser(formData),
        onSuccess: (data: IUserStoreData) => onSuccessFunc(data),
    });
};