import Box from "@mui/material/Box";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { formatDate } from "../../../utils/formatDate";
import {
    useCheckLikeQuery,
    useLikePostMutation,
    useDislikePostMutation,
} from "../../likes";
import { Theme, useMediaQuery } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/slices/authSlice";

const PostPreview = (props: IPost) => {
    const navigate = useNavigate();
    const { mutate: likePost } = useLikePostMutation();
    const { mutate: dislikePost } = useDislikePostMutation();
    const user = useSelector(selectCurrentUser);
    const { data: isPostLiked } = useCheckLikeQuery(user?.id || "", props.id);
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("md"),
    );

    const handleLikePost = async () => {
        const data = {
            postId: props.id,
            userId: user?.id,
            authorId: props.authorId,
        };

        if (isPostLiked) {
            dislikePost(data);
        } else {
            likePost(data);
        }
    };

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
                to={`/posts/${props.id}`}
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
                    src={props.postImg as string}
                    alt="Blog image"
                />
            </Box>
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        color: "highlight.main",
                        mb: { xs: 1, md: 2 },
                        alignItems: "center",
                    }}
                >
                    <Box
                        to={`/users/${props.author.id}`}
                        component={NavLink}
                        sx={{
                            color: "inherit",
                            textUnderlineOffset: "2px",
                            textDecoration: "none",
                            transition: "text-decoration 0.2s ease-in-out",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                            flexShrink: 0,
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            {props.author.fullName}
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
                        to={`/posts/${props.id}`}
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
                        to={`/posts/${props.id}`}
                        sx={{
                            color: "inherit",
                            pl: 0.5,
                            transition: "scale .2s ease-in-out",
                            "&:hover": {
                                scale: "110%",
                            },
                        }}
                    >
                        <ArrowOutwardIcon
                            fontSize={isSmallScreen ? "small" : "medium"}
                        />
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
                                isPostLiked ? (
                                    <FavoriteOutlinedIcon color="info" />
                                ) : (
                                    <FavoriteBorderOutlinedIcon />
                                )
                            }
                            size={isSmallScreen ? "small" : "medium"}
                            onClick={handleLikePost}
                        >
                            {props.likesNumber}
                        </Button>
                        <Button
                            variant="text"
                            startIcon={<ChatBubbleOutlineIcon />}
                            size={isSmallScreen ? "small" : "medium"}
                            onClick={() => navigate(`/posts/${props.id}`)}
                        >
                            {props.comments.length}
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default PostPreview;
