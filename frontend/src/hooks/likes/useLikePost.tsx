import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "../../services/likes";

type LikeData = { userId: string, postId: string}

export const useLikePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LikeData) => likePost(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"], refetchType: "all"});
            queryClient.invalidateQueries({ queryKey: ["likes"] });
        }
    });
};
