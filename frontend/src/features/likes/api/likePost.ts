import { api } from "../../../app/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const likePost = async (data: Partial<ILike>): Promise<ILike> => {
    const response = await api.post("/posts/like", data);
    return response.data;
};

export const useLikePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<ILike>) => likePost(data),
        // onSuccess: () => {
        //     queryClient.invalidateQueries({ queryKey: ["posts"], refetchType: "all"});
        //     queryClient.invalidateQueries({ queryKey: ["likes"] });
        // }
    });
};