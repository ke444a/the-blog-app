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
        onMutate: async (dislike) => {
            await queryClient.cancelQueries(["likes", dislike.userId, dislike.postId]);
            await queryClient.cancelQueries(["posts", "all"]);
            const previousIsLiked = queryClient.getQueryData<{ isLiked: boolean }>(["likes", dislike.userId, dislike.postId]);
            const previousPosts = queryClient.getQueryData<{ pages: IPost[] }>(["posts", "all"]);
            if (previousIsLiked && previousPosts) {
                queryClient.setQueryData<{ pages: IPost[]}>(["posts", "all"], (oldPosts) => {
                    const postsCopy = JSON.parse(JSON.stringify(oldPosts));
                    const postsWithDislike = postsCopy.pages.map((post: IPost) => {
                        if (post.id === dislike.postId) {
                            post.likesNumber -= 1;
                        }
                        return post;
                    });
                    return { pages: postsWithDislike };
                });
                queryClient.setQueryData<{ isLiked: boolean }>(["likes", dislike.userId, dislike.postId], (oldIsLiked) => ({ isLiked: !oldIsLiked?.isLiked }));
            }

            return { previousIsLiked, previousPosts };
        },
        onError: (_err, newDislike, context) => {
            if (context?.previousIsLiked) {
                queryClient.setQueryData<{ isLiked: boolean }>(["likes", newDislike.userId, newDislike.postId], context.previousIsLiked);
            }

            if (context?.previousPosts) {
                queryClient.setQueryData<{ pages: IPost[] }>(["posts", "all"], context.previousPosts);
            }
        },
        onSettled: (newDislike) => {
            queryClient.invalidateQueries(["likes", newDislike?.userId, newDislike?.postId]);
            queryClient.invalidateQueries(["posts", "all"]);
        }
    });
};