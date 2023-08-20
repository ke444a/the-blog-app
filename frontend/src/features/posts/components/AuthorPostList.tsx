import { useGetPostsByAuthorQuery } from "../api/getPostsByAuthor";
import { sortPostsByDate } from "../../../utils/sortByDate";
import { Spinner } from "../../../components/Elements/Spinner";
import PostPreview from "./PostPreview";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

const AuthorPostList = ({ userProfileId }: { userProfileId: string }) => {
    const {
        data: authorPosts,
        isLoading,
        isSuccess,
    } = useGetPostsByAuthorQuery(userProfileId);

    if (isLoading) {
        return <Spinner />;
    }

    if (!isSuccess) {
        return null;
    }

    return (
        <>
            {authorPosts.length > 0 ? (
                <Grid container spacing={2}>
                    {sortPostsByDate(authorPosts).map((post: IPost) => (
                        <Grid item xs={12} md={6} lg={4} xl={3} key={post.id}>
                            <PostPreview {...post} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography
                    variant="h2"
                    sx={(theme) => ({
                        [theme.breakpoints.down("md")]: {
                            fontSize: "1.3em",
                        },
                    })}
                >
                    No posts yet.{" "}
                    <Link
                        style={{ color: "inherit", textUnderlineOffset: "3px" }}
                        to="/posts/editor"
                    >
                        Start writing now!
                    </Link>
                </Typography>
            )}
        </>
    );
};

export default AuthorPostList;
