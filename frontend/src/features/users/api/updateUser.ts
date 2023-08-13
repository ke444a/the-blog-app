import { useMutation } from "@tanstack/react-query";
import { api } from "../../../app/api";

const updateUser = async (data: FormData, userId: string): Promise<IUser> => {
    const response = await api.patch(`/users/${userId}`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
};

export const useUpdateUserMutation = (userId: string) => {
    return useMutation({
        mutationFn: (postData: FormData) => updateUser(postData, userId),
    });
};