import { useQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";

const checkLike = async (
    userId: string,
    postId: string,
): Promise<{ isLiked: boolean }> => {
    const response = await api.get(
        `/posts/user/likes/?userId=${userId}&postId=${postId}`,
    );
    return response.data;
};

export const useCheckLikeQuery = (authorId: string, postId: string) => {
    return useQuery({
        queryKey: ["likes", authorId, postId],
        queryFn: () => checkLike(authorId, postId),
        select: (data) => {
            return data.isLiked;
        },
    });
};
