import { useMutation } from "@tanstack/react-query";
import { dislikePost } from "../../services/likes";

type DislikeData = { userId: string; postId: string };

export const useDislikePost = (accessToken: string) => {
    return useMutation({
        mutationFn: (data: DislikeData) => dislikePost(data, accessToken),
    });
};
