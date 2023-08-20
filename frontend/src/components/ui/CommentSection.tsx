import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Comment from "./Comment";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { usePostComments } from "../../hooks/comments/usePostComments";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useCreateComment } from "../../hooks/comments/useCreateComment";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useMediaQuery, Theme } from "@mui/material";
import defaultAvatar from "../../assets/default.webp";
import { sortCommentsByDate } from "../../utils/sortByDate";
import AddCommentIcon from "@mui/icons-material/AddComment";

const CommentSection = (props: { postId: string }) => {
    const [commentContent, setCommentContent] = useState<string>("");
    const user = useSelector(selectCurrentUser);
    const postCommentsQuery = usePostComments(props.postId);
    const createPostMutation = useCreateComment();
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
    
    const publishComment = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const commentData = {
            authorId: user?._id || "",
            postId: props.postId,
            content: commentContent    
        };
        createPostMutation.mutate(commentData);
        setCommentContent("");
    };
    
    
    if (!postCommentsQuery.isSuccess) {
        return null;
    }

    return (
        <Box mt={5}>
            <Typography variant="body1" fontWeight={600} mb={2}>
                {postCommentsQuery.data.length} comments
            </Typography>
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
                    src={user?.avatar || defaultAvatar}
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
                                        fontSize={isSmallScreen ? "small" : "inherit"}
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
            <Stack spacing={3} pt={1} mb={2}>
                {sortCommentsByDate(postCommentsQuery.data).map(
                    (comment: IComment) => (
                        <Comment
                            key={comment._id}
                            authorId={comment.authorId}
                            createdAt={comment.createdAt}
                            content={comment.content}
                        />
                    )
                )}
            </Stack>
        </Box>
    );
};

export default CommentSection;
