import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { formatDate } from "../../utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/users";

const Post = (props: Omit<Post, "_id"> & {accessToken: string, id: string}) => {
    const { data: author, isSuccess } = useQuery({
        queryKey: ["author", props.authorId],
        queryFn: () => getUser(props.authorId, props.accessToken),
    });

    if (!isSuccess) {
        return null;
    }

    return (
        <Box
            sx={{
                display: "flex",
                padding: "20px",
            }}
        >
            <Box
                component={NavLink}
                to={"/post"}
                sx={{
                    display: "block",
                    marginRight: "15px",
                    transition: "opacity 0.2s ease-in-out",
                    cursor: "pointer",
                    textDecoration: "none",

                    "&:hover": {
                        opacity: 0.9,
                    },
                }}
            >
                <Box
                    component="img"
                    sx={{
                        width: 320,
                        height: 275,
                        objectFit: "cover",
                        borderRadius: "5%",
                    }}
                    src={props.postImg}
                    alt=""
                />
            </Box>
            <Box>
                <Box
                    component={NavLink}
                    to="/post"
                    sx={{
                        display: "inline-block",
                        fontFamily: "Poppins",
                        fontWeight: 700,
                        fontSize: "1.5em",
                        marginBottom: "5px",
                        color: "inherit",
                        textDecoration: "none",
                        transition: "text-decoration 0.2s ease-in-out",
                        lineHeight: 1.2,

                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                >
                    {props.title}
                </Box>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    <Box
                        component="span"
                        sx={{
                            opacity: 0.8,
                            fontWeight: 700,
                        }}
                    >
                        <Box 
                            to={`/profile/${author.username}`}
                            component={NavLink}
                            sx={{
                                color: "inherit",
                                textUnderlineOffset: "2px",
                            }}
                        >
                            {author.fullName}
                        </Box> | {formatDate(props.createdAt)}
                    </Box>
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        marginBottom: 2,
                        textAlign: "justify",
                        maxWidth: "90%",

                        "@media (min-width: 1024px)": {
                            maxWidth: "80%",
                        },
                    }}
                >
                    {props.preview}
                </Typography>
                <Button
                    sx={{
                        marginRight: "10px",
                    }}
                    variant="outlined"
                    startIcon={<FavoriteBorderOutlinedIcon />}
                >
                    {props.likesNumber}
                </Button>
                <Button
                    sx={{
                        marginRight: "10px",
                    }}
                    variant="outlined"
                    startIcon={<ChatBubbleOutlineIcon />}
                >
                    {props.comments.length}
                </Button>
                <Button
                    variant="contained"
                    color="info"
                    endIcon={<ArrowForwardIosIcon />}
                >
            Read More
                </Button>
            </Box>
        </Box>
    );
};

export default Post;
