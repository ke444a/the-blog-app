import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../services/users";

export const useUpdateUser = (userId: string, accessToken: string, onSuccessFunc: (data: User) => void) => {
    return useMutation({
        mutationFn: (postData: FormData) =>
            updateUser(postData, userId, accessToken),
        onSuccess: onSuccessFunc,
    });
};
