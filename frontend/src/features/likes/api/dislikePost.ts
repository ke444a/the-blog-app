import { useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../../../app/api";

const dislikePost = async (
    data: Partial<ILike> & { authorId: string },
): Promise<ILike> => {
    const { authorId, ...dislikeData } = data;
    const response = await api.post("/posts/dislike", dislikeData);
    return response.data;
};

export const useDislikePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<ILike> & { authorId: string }) =>
            dislikePost(data),
        onMutate: async (dislike) => {
            await queryClient.cancelQueries([
                "likes",
                dislike.userId,
                dislike.postId,
            ]);
            await queryClient.cancelQueries(["posts"]);
            const previousIsLiked = queryClient.getQueryData<{
                isLiked: boolean;
            }>(["likes", dislike.userId, dislike.postId]);
            const previousAllPosts = queryClient.getQueryData<{
                pages: IPost[];
            }>(["posts", "all"]);
            const previousAuthorPosts = queryClient.getQueryData<IPost[]>([
                "posts",
                dislike.authorId,
            ]);
            if (previousAllPosts) {
                queryClient.setQueryData<{ pages: IPost[] }>(
                    ["posts", "all"],
                    (oldPosts) => {
                        const postsCopy = JSON.parse(JSON.stringify(oldPosts));
                        const postsWithDislike = postsCopy.pages.map(
                            (post: IPost) => {
                                if (post.id === dislike.postId) {
                                    post.likesNumber -= 1;
                                }
                                return post;
                            },
                        );
                        return { pages: postsWithDislike };
                    },
                );
            }
            if (previousAuthorPosts) {
                queryClient.setQueryData<IPost[]>(
                    ["posts", dislike.authorId],
                    (oldPosts) => {
                        const postsCopy = JSON.parse(JSON.stringify(oldPosts));
                        return postsCopy.map((post: IPost) => {
                            if (post.id === dislike.postId) {
                                post.likesNumber += 1;
                            }
                            return post;
                        });
                    },
                );
            }

            if (previousIsLiked) {
                queryClient.setQueryData<{ isLiked: boolean }>(
                    ["likes", dislike.userId, dislike.postId],
                    (oldIsLiked) => ({ isLiked: !oldIsLiked?.isLiked }),
                );
            }

            return { previousIsLiked, previousAllPosts, previousAuthorPosts };
        },
        onError: (_err, newDislike, context) => {
            if (context?.previousIsLiked) {
                queryClient.setQueryData<{ isLiked: boolean }>(
                    ["likes", newDislike.userId, newDislike.postId],
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
                    ["posts", newDislike.authorId],
                    context.previousAuthorPosts,
                );
            }
        },
        onSettled: (newDislike) => {
            queryClient.invalidateQueries([
                "likes",
                newDislike?.userId,
                newDislike?.postId,
            ]);
            queryClient.invalidateQueries(["posts"]);
        },
    });
};
