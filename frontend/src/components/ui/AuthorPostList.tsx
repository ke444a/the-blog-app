import { useGetPostsByUser } from "../../hooks/posts/useGetPostsByUser";
import { sortByDate } from "../../utils/sortByDate";
import { Spinner } from "./Spinner";
import PostPreview from "./PostPreview";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const AuthorPostList = ({ userProfileId }: { userProfileId: string }) => {
    const authorPostsQuery = useGetPostsByUser(userProfileId);
    if (!authorPostsQuery.isSuccess) {
        return null;
    }

    if (authorPostsQuery?.isLoading) {
        return <Spinner />;
    }

    return (
        <>
            {authorPostsQuery.data.length > 0 ? (
                sortByDate(authorPostsQuery.data).map((post: IPost) => (
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
                        userId={userProfileId}
                    />
                ))
            ) : (
                <Typography
                    variant="h2"
                    sx={(theme) => ({
                        [theme.breakpoints.down("md")]: {
                            fontSize: "1.5em",
                        },
                        [theme.breakpoints.down("sm")]: {
                            fontSize: "1.1em",
                        },
                    })}
                >
            No posts yet. <Link style={{ color: "inherit", textUnderlineOffset: "3px" }} to="/editor">Start writing now! </Link>
                </Typography>
            )}
        </>
    );
};

export default AuthorPostList;
