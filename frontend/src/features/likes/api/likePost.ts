import { api } from "../../../app/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const likePost = async (
    data: Partial<ILike> & { authorId: string },
): Promise<ILike> => {
    const { authorId, ...likeData } = data;
    const response = await api.post("/posts/like", likeData);
    return response.data;
};

export const useLikePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<ILike> & { authorId: string }) =>
            likePost(data),
        onMutate: async (like) => {
            await queryClient.cancelQueries([
                "likes",
                like.userId,
                like.postId,
            ]);
            await queryClient.cancelQueries(["posts"]);
            const previousIsLiked = queryClient.getQueryData<{
                isLiked: boolean;
            }>(["likes", like.userId, like.postId]);
            const previousAllPosts = queryClient.getQueryData<{
                pages: IPost[];
            }>(["posts", "all"]);
            const previousAuthorPosts = queryClient.getQueryData<IPost[]>([
                "posts",
                like.authorId,
            ]);
            if (previousAllPosts) {
                queryClient.setQueryData<{ pages: IPost[] }>(
                    ["posts", "all"],
                    (oldPosts) => {
                        const postsCopy = JSON.parse(JSON.stringify(oldPosts));
                        const postsWithLike = postsCopy.pages.map(
                            (post: IPost) => {
                                if (post.id === like.postId) {
                                    post.likesNumber += 1;
                                }
                                return post;
                            },
                        );
                        return { pages: postsWithLike };
                    },
                );
            }
            if (previousAuthorPosts) {
                queryClient.setQueryData<IPost[]>(
                    ["posts", like.authorId],
                    (oldPosts) => {
                        const postsCopy = JSON.parse(JSON.stringify(oldPosts));
                        return postsCopy.map((post: IPost) => {
                            if (post.id === like.postId) {
                                post.likesNumber += 1;
                            }
                            return post;
                        });
                    },
                );
            }
            if (previousIsLiked) {
                queryClient.setQueryData<{ isLiked: boolean }>(
                    ["likes", like.userId, like.postId],
                    (oldIsLiked) => ({ isLiked: !oldIsLiked?.isLiked }),
                );
            }
            return { previousIsLiked, previousAllPosts, previousAuthorPosts };
        },
        onError: (_err, newLike, context) => {
            if (context?.previousIsLiked) {
                queryClient.setQueryData<{ isLiked: boolean }>(
                    ["likes", newLike.userId, newLike.postId],
                    context.previousIsLiked,
                );
            }

            if (context?.previousAllPosts) {
                queryClient.setQueryData<{ pages: IPost[] }>(
                    ["posts", "all"],
                    context.previousAllPosts,
                );
            }

            if (context?.previousAuthorPosts) {
                queryClient.setQueryData<IPost[]>(
                    ["posts", newLike.authorId],
                    context.previousAuthorPosts,
                );
            }
        },
        onSettled: (newLike) => {
            queryClient.invalidateQueries([
                "likes",
                newLike?.userId,
                newLike?.postId,
            ]);
            queryClient.invalidateQueries(["posts"]);
        },
    });
};
