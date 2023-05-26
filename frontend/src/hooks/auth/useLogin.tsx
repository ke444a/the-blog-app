import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/auth";

export const useLogin = (onSuccessFunc: (data: UserStoreData) => void) => {
    return useMutation({
        mutationFn: (formData: UserLoginCredentials) => loginUser(formData),
        onSuccess: (data: UserStoreData) => onSuccessFunc(data),
    });
};