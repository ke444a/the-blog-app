import { useMutation } from "@tanstack/react-query";
import { likePost } from "../../services/likes";

type LikeData = { userId: string, postId: string}

export const useLikePost = (accessToken: string) => {
    return useMutation({
        mutationFn: (data: LikeData) => likePost(data, accessToken),
    });
};
