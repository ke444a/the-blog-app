import { useGetAllPosts } from "../../hooks/posts/useGetAllPosts";
import { Spinner } from "./Spinner";
import { Fragment } from "react";
import PostPreview from "./PostPreview";
import IconButton from "@mui/material/IconButton";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

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
            {allPostsQuery.data?.pages.map((page) => {
                return (
                    <Fragment key={page.page}>
                        {page.posts.map((post: IPost) => {
                            return (
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
                            );
                        })}
                    </Fragment>
                );
            })}
            {allPostsQuery.hasNextPage && allPostsQuery.isFetched && (
                <IconButton 
                    color="primary" 
                    onClick={() => allPostsQuery.fetchNextPage()}
                    sx={{
                        display: "block",
                        cursor: "pointer",
                        margin: "0 auto",
                        transition: "scale .2s ease-in-out",
                        "&: hover": {
                            backgroundColor: "transparent",
                            scale: "110%"
                        }
                    }}
                >
                    <ExpandCircleDownIcon fontSize="large" />
                </IconButton>
            )}

            {allPostsQuery.isFetching && !allPostsQuery.isFetchingNextPage && <Spinner /> }
        </>
    );
};

export default PostFeed;
