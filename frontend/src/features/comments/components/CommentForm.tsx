import { useState } from "react";
import { useCreateCommentMutation } from "../api/createComment";
import { useMediaQuery, Theme } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/slices/authSlice";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import defaultAvatar from "../../../assets/images/default_avatar.webp";
import AddCommentIcon from "@mui/icons-material/AddComment";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

type Props = {
    postId: string;
};

const CommentForm = (props: Props) => {
    const user = useSelector(selectCurrentUser);
    const [commentContent, setCommentContent] = useState<string>("");
    const { mutate: createComment } = useCreateCommentMutation();
    const publishComment = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (commentContent) {
            const commentData = {
                authorId: user?.id || "",
                postId: props.postId,
                content: commentContent,
            };
            createComment(commentData);
            setCommentContent("");
        }
    };

    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("md"),
    );

    return (
        <Box
            component="form"
            onSubmit={publishComment}
            sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
            }}
        >
            <Box
                component="img"
                src={(user?.avatar as string) || defaultAvatar}
                alt=""
                sx={{
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    marginRight: 2,
                }}
            />
            <TextField
                name="content"
                type="text"
                variant="standard"
                aria-required
                placeholder="Leave your comment here..."
                fullWidth
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={publishComment}>
                                <AddCommentIcon
                                    fontSize={
                                        isSmallScreen ? "small" : "inherit"
                                    }
                                />
                            </IconButton>
                        </InputAdornment>
                    ),
                    style: {
                        fontSize: "1.2em",
                    },
                }}
            />
        </Box>
    );
};

export default CommentForm;
