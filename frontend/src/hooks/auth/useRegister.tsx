import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/auth";

export const useRegister = (onSuccessFunc: (data: UserReturnData) => void) => {
    return useMutation({
        mutationFn: (formData: FormData) => registerUser(formData),
        onSuccess: (data: UserReturnData) => onSuccessFunc(data),
    });
};