import Box from "@mui/material/Box";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { formatDate } from "../../utils/formatDate";
import { useState } from "react";
import { useGetUser } from "../../hooks/users/useGetUser";
import { useCheckUserLike } from "../../hooks/likes/useCheckUserLike";
import { useLikePost } from "../../hooks/likes/useLikePost";
import { useDislikePost } from "../../hooks/likes/useDislikePost";
import { Theme, useMediaQuery } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

type PostProps = Omit<IPost, "_id"> & {id: string, userId: string};

const PostPreview = (props: PostProps) => {
    // const context = useContext(PostContext);
    const [likesNumber, setLikesNumber] = useState<number>(props.likesNumber);
    const [isLikedPost, setIsLikedPost] = useState<boolean>(false);
    const navigate = useNavigate();
    const likeMutation = useLikePost();
    const dislikeMutation = useDislikePost();
    const authorQuery = useGetUser(props.authorId);
    const onCheckUserLikeSuccess = (data: { isLiked: boolean }) => {
        setIsLikedPost(data.isLiked);
    };
    const checkUserLike = useCheckUserLike(props.userId, props.id, onCheckUserLikeSuccess);
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

    const handleLikePost = async () => {
        const data = {
            postId: props.id,
            userId: props.userId
        };
        const isLiked: boolean = isLikedPost;
        setIsLikedPost((prevState) => !prevState);

        if (isLiked) {
            setLikesNumber((prevNum) => prevNum - 1);
            dislikeMutation.mutate(data);
        } else {
            setLikesNumber((prevNum) => prevNum + 1);
            likeMutation.mutate(data);
        }
    };

    if (!authorQuery.isSuccess || !checkUserLike.isSuccess) {
        return null;
    }

    return (
        <Box
            sx={{
                display: "flex",
                marginBottom: isSmallScreen ? "40px" : "20px",
                flexDirection: "column",
            }}
        >
            <Box
                component={NavLink}
                to={`/post/${props.id}`}
                sx={{
                    display: "block",
                    transition: "opacity 0.2s ease-in-out",
                    cursor: "pointer",
                    textDecoration: "none",
                    mb: 3,
                    "&:hover": {
                        opacity: 0.9,
                    },
                }}
            >
                <Box
                    component="img"
                    sx={(theme) => ({
                        objectFit: "cover",
                        borderRadius: "5%",
                        width: "100%",
                        [theme.breakpoints.up("md")]: {
                            height: "240px",
                        },
                        height: "200px",
                    })}
                    src={props.postImg}
                    alt="Blog image"
                />
            </Box>
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        color: "highlight.main",
                        mb: { xs: 1, md: 2 },
                        alignItems: "center"
                    }}
                >
                    <Box
                        to={`/profile/${authorQuery.data._id}`}
                        component={NavLink}
                        sx={{
                            color: "inherit",
                            textUnderlineOffset: "2px",
                            textDecoration: "none",
                            transition: "text-decoration 0.2s ease-in-out",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                            flexShrink: 0
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            {authorQuery.data.fullName}
                        </Typography>
                    </Box>
                    <Box sx={{ px: 0.5 }}>•</Box>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                        }}
                    >
                        {formatDate(props.createdAt)}
                    </Typography>
                </Box>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                >
                    <Box
                        component={NavLink}
                        to={`/post/${props.id}`}
                        sx={(theme) => ({
                            display: "inline-block",
                            fontWeight: 600,
                            fontSize: theme.typography.h3,
                            marginBottom: theme.spacing(1),
                            color: "inherit",
                            textDecoration: "none",
                            transition: "text-decoration 0.2s ease-in-out",
                            objectFit: "cover",

                            "&:hover": {
                                textDecoration: "underline",
                            },
                        })}
                    >
                        {props.title}
                    </Box>
                    <Box
                        component={Link}
                        to={`/post/${props.id}`}
                        sx={{
                            color: "inherit",
                            pl: 0.5,
                            transition: "scale .2s ease-in-out",
                            "&:hover": {
                                scale: "110%",
                            },
                        }}
                    >
                        <ArrowOutwardIcon fontSize={isSmallScreen ? "small" : "medium"} />
                    </Box>
                </Stack>
                <Typography
                    variant="body1"
                    sx={{
                        marginBottom: { xs: 1, md: 2 },
                        color: "secondary.main",
                        fontSize: "1rem",
                    }}
                >
                    {props.preview}
                </Typography>
                <Stack
                    direction="row"
                    spacing={{ xs: 0, md: 1 }}
                    alignItems="flex-start"
                    flexDirection={isSmallScreen ? "column" : "row"}
                    mt="auto"
                >
                    <Box>
                        <Button
                            variant="text"
                            startIcon={
                                isLikedPost ? (
                                    <FavoriteOutlinedIcon color="error" />
                                ) : (
                                    <FavoriteBorderOutlinedIcon />
                                )
                            }
                            size={isSmallScreen ? "small" : "medium"}
                            onClick={handleLikePost}
                        >
                            {likesNumber}
                        </Button>
                        <Button
                            variant="text"
                            startIcon={<ChatBubbleOutlineIcon />}
                            size={isSmallScreen ? "small" : "medium"}
                            onClick={() => navigate(`/post/${props.id}`)}
                        >
                            {props.comments.length}
                        </Button>
                    </Box>
                    {/* <Button
                        variant="outlined"
                        color="info"
                        endIcon={<ArrowForwardIosIcon />}
                        component={NavLink}
                        to={`/post/${props.id}`}
                        size={isSmallScreen ? "small" : "medium"}
                    >
              Read More
                    </Button> */}
                </Stack>
            </Box>
        </Box>
    );
};

export default PostPreview;
