import { useGetPostsByUser } from "../../hooks/posts/useGetPostsByUser";
import { sortPostsByDate } from "../../utils/sortByDate";
import { Spinner } from "./Spinner";
import PostPreview from "./PostPreview";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

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
                <Grid container spacing={2}>
                    {sortPostsByDate(authorPostsQuery.data).map((post: IPost) => (
                        <Grid item xs={12} md={6} lg={4} xl={3} key={post._id}>
                            <PostPreview
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
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography
                    variant="h2"
                    sx={(theme) => ({
                        [theme.breakpoints.down("md")]: {
                            fontSize: "1.3em",
                        }
                    })}
                >
            No posts yet.{" "}
                    <Link
                        style={{ color: "inherit", textUnderlineOffset: "3px" }}
                        to="/editor"
                    >
              Start writing now!
                    </Link>
                </Typography>
            )}
        </>
    );
};

export default AuthorPostList;
