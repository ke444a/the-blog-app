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
        onMutate: async (like) => {
            await queryClient.cancelQueries(["likes", like.userId, like.postId]);
            await queryClient.cancelQueries(["posts", "all"]);
            const previousIsLiked = queryClient.getQueryData<{ isLiked: boolean }>(["likes", like.userId, like.postId]);
            const previousPosts = queryClient.getQueryData<{ pages: IPost[] }>(["posts", "all"]);
            if (previousIsLiked && previousPosts) {
                queryClient.setQueryData<{ pages: IPost[]}>(["posts", "all"], (oldPosts) => {
                    const postsCopy = JSON.parse(JSON.stringify(oldPosts));
                    const postsWithLike = postsCopy.pages.map((post: IPost) => {
                        if (post.id === like.postId) {
                            post.likesNumber += 1;
                        }
                        return post;
                    });
                    return { pages: postsWithLike };
                });
                queryClient.setQueryData<{ isLiked: boolean }>(["likes", like.userId, like.postId], (oldIsLiked) => {
                    return { isLiked: !oldIsLiked?.isLiked };
                });
            }
            return { previousIsLiked, previousPosts };
        },
        onError: (_err, newLike, context) => {
            if (context?.previousIsLiked) {
                queryClient.setQueryData<{ isLiked: boolean }>(["likes", newLike.userId, newLike.postId], context.previousIsLiked);
            }

            if (context?.previousPosts) {
                queryClient.setQueryData<{ pages: IPost[] }>(["posts", "all"], context.previousPosts);
            }
        },
        onSettled: (newLike) => {
            queryClient.invalidateQueries(["likes", newLike?.userId, newLike?.postId]);
            queryClient.invalidateQueries(["posts", "all"]);
        }
    });
};