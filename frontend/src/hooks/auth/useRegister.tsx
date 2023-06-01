import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/auth";

export const useRegister = (onSuccessFunc: (data: IUserStoreData) => void) => {
    return useMutation({
        mutationFn: (formData: FormData) => registerUser(formData),
        onSuccess: (data: IUserStoreData) => onSuccessFunc(data),
    });
};