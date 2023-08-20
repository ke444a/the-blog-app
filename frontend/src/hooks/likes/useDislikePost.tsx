import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dislikePost } from "../../services/likes";

interface DislikeData { 
    userId: string; 
    postId: string 
}

export const useDislikePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: DislikeData) => dislikePost(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"], refetchType: "all"});
            queryClient.invalidateQueries({ queryKey: ["likes"] });

        },
    });
};
