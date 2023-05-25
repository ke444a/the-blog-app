import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Comment from "./Comment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { usePostComments } from "../../hooks/comments/usePostComments";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../features/auth/authSlice";
import { useCreateComment } from "../../hooks/comments/useCreateComment";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const CommentSection = (props: { postId: string }) => {
    const [commentContent, setCommentContent] = useState<string>("");
    const user: User = useSelector(selectCurrentUser);
    const accessToken: string = useSelector(selectCurrentToken);
    const postCommentsQuery = usePostComments(props.postId, accessToken);
    const createPostMutation = useCreateComment(accessToken);
    
    const publishComment = (event: any) => {
        event.preventDefault();
        const commentData = {
            authorId: user._id,
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
            <Typography variant="body1" fontWeight={500} mb={2}>
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
                    src={user.avatar}
                    alt=""
                    sx={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        marginRight: "12px",
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
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Stack spacing={3} p={1}>
                {postCommentsQuery.data.map((comment: Comment) => (
                    <Comment
                        key={comment._id}
                        authorId={comment.authorId}
                        createdAt={comment.createdAt}
                        content={comment.content}
                        accessToken={accessToken}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default CommentSection;
