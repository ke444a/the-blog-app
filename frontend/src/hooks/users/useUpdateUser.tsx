import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../services/users";

export const useUpdateUser = (userId: string, onSuccessFunc: (data: IUser) => void) => {
    return useMutation({
        mutationFn: (postData: FormData) =>
            updateUser(postData, userId),
        onSuccess: onSuccessFunc,
    });
};
