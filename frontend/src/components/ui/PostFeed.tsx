import { useGetAllPosts } from "../../hooks/posts/useGetAllPosts";
import { Spinner } from "./Spinner";
import PostPreview from "./PostPreview";
import Grid from "@mui/material/Grid";
import { Fragment } from "react";
import Button from "@mui/material/Button";

const PostFeed = () => {
    const allPostsQuery = useGetAllPosts();
    if (!allPostsQuery.isSuccess) {
        return null;
    }

    if (allPostsQuery.isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Grid container spacing={2}>
                {allPostsQuery.data?.pages.map((page) => {
                    return (
                        <Fragment key={page.page}>
                            {page.posts.map((post: IPost) => {
                                return (
                                    <Grid item key={post._id} xs={12} sm={6} md={4} xl={3}>
                                        <PostPreview
                                            key={post._id}
                                            id={post._id}
                                            title={post.title}
                                            content={post.content}
                                            preview={post.preview}
                                            createdAt={post.createdAt}
                                            authorId={post.authorId}
                                            updatedAt={post.updatedAt}
                                            postImg={post.postImg}
                                            likesNumber={post.likesNumber}
                                            comments={post.comments}
                                            userId={post.authorId}
                                        />
                                    </Grid>
                                );
                            })}
                        </Fragment>
                    );
                })}
            </Grid>
            {allPostsQuery.hasNextPage && allPostsQuery.isFetched && (
                <Button
                    onClick={() => allPostsQuery.fetchNextPage()}
                    variant="outlined"
                    color="secondary"
                    size="large"
                    aria-label="Load more"
                    sx={{
                        display: "block",
                        margin: "0 auto",
                        textTransform: "capitalize",
                        fontSize: "1em",
                    }}
                >
                    View More
                </Button>
            )}

            {allPostsQuery.isFetching && !allPostsQuery.isFetchingNextPage && (
                <Spinner />
            )}
        </>
    );
};

export default PostFeed;
