import { useGetAllPostsQuery } from "../api/getAllPosts";
import { Spinner } from "../../../components/Elements/Spinner";
import PostPreview from "./PostPreview";
import Grid from "@mui/material/Grid";
import { Fragment } from "react";
import Button from "@mui/material/Button";

const PostFeed = () => {
    const allPostsQuery = useGetAllPostsQuery();
    if (allPostsQuery.isLoading) {
        return <Spinner />;
    }

    if (!allPostsQuery.isSuccess) {
        return null;
    }

    return (
        <>
            <Grid container spacing={2}>
                {allPostsQuery.data?.pages.map((page) => {
                    return (
                        <Fragment key={page.page}>
                            {page.posts.length > 0 &&
                                page.posts.map((post: IPost) => {
                                    return (
                                        <Grid
                                            item
                                            key={post.id}
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            xl={3}
                                        >
                                            <PostPreview
                                                key={post.id}
                                                {...post}
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
