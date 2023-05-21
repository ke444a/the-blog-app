import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { selectCurrentToken, selectCurrentUser } from "../features/auth/authSlice";
import { getUserByUsername } from "../services/users";
import { getPostsByAuthor } from "../services/posts";
import PostPreview from "../components/ui/PostPreview";
import CustomContainer from "../components/ui/CustomContainer";

const Profile = () => {
    const username: string = useLocation().pathname.split("/")[2];
    const accessToken: string = useSelector(selectCurrentToken);
    const user: User = useSelector(selectCurrentUser);

    const userInfoQuery = useQuery({
        queryKey: ["users", username],
        queryFn: () => getUserByUsername(username, accessToken)
    });

    const authorId = userInfoQuery.data?._id;

    const postsByUserQuery = useQuery({
        queryKey: ["posts", authorId],
        queryFn: () => getPostsByAuthor(authorId, accessToken),
        enabled: !!authorId,
    });

    if (!userInfoQuery.isSuccess || !postsByUserQuery?.isSuccess) {
        return null;
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                sx={{
                    padding: "25px 0",
                    width: "100%",
                    marginBottom: "20px",
                }}
                elevation={2}
                square
            >
                <CustomContainer
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    {userInfoQuery.data?.avatar && (
                        <Box
                            component="img"
                            sx={{
                                width: "200px",
                                height: "200px",
                                borderRadius: "50%",
                                marginRight: "25px",
                            }}
                            src={userInfoQuery.data?.avatar}
                            alt=""
                        />
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography variant="h2">
                                {userInfoQuery.data?.fullName}
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    opacity: 0.5,
                                    marginBottom: "20px",
                                    fontSize: ".9em",
                                    fontWeight: 500,
                                }}
                            >
                  @{userInfoQuery.data?.username}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 500,
                                    maxWidth: "95%",
                                }}
                            >
                                {userInfoQuery.data?.bio}
                            </Typography>
                        </Box>
                        {user.username === username && (
                            <Stack spacing={1} sx={{ marginLeft: 2 }}>
                                <Button
                                    size="medium"
                                    color="info"
                                    variant="outlined"
                                    sx={{
                                        fontWeight: 500,
                                        borderRadius: "10px",
                                        textTransform: "initial",
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="medium"
                                    color="error"
                                    variant="outlined"
                                    sx={{
                                        fontWeight: 500,
                                        borderRadius: "10px",
                                        textTransform: "initial",
                                    }}
                                >
                                    Logout
                                </Button>
                            </Stack>
                        )}
                    </Box>
                </CustomContainer>
            </Paper>
            <CustomContainer>
                <Typography variant="h3" gutterBottom>
            Published Blogs
                </Typography>
                {postsByUserQuery.data?.map((post: Post, index: number) => {
                    return (
                        <PostPreview
                            key={index}
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
                            accessToken={accessToken}
                        />
                    );
                })}
            </CustomContainer>
        </Box>
    );
};

export default Profile;