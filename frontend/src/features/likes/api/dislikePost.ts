import { useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../../../app/api";

const dislikePost = async (data: Partial<ILike>): Promise<ILike> => {
    const response = await api.post("/posts/dislike", data);
    return response.data;
};

export const useDislikePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<ILike>) => dislikePost(data),
        // onSuccess: () => {
        //     queryClient.invalidateQueries({ queryKey: ["posts"], refetchType: "all"});
        //     queryClient.invalidateQueries({ queryKey: ["likes"] });
        // },
    });
};