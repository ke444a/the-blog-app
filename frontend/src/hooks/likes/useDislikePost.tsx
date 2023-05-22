import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dislikePost } from "../../services/likes";

type DislikeData = { userId: string; postId: string };

export const useDislikePost = (accessToken: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: DislikeData) => dislikePost(data, accessToken),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"], refetchType: "all"});
            queryClient.invalidateQueries({ queryKey: ["likes"] });

        },
    });
};
