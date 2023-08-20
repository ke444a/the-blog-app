import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Comment } from "./Comment";
import Stack from "@mui/material/Stack";
import { usePostCommentsQuery } from "../api/getPostComments";
import { sortCommentsByDate } from "../../../utils/sortByDate";
import CommentForm from "./CommentForm";

export const CommentSection = (props: { postId: string }) => {
    const { data: postComments, isSuccess } = usePostCommentsQuery(
        props.postId,
    );
    if (!isSuccess) {
        return null;
    }

    return (
        <Box mt={5}>
            <Typography variant="body1" fontWeight={600} mb={2}>
                {postComments.length} comments
            </Typography>
            <CommentForm postId={props.postId} />
            <Stack spacing={3} pt={1} mb={2}>
                {sortCommentsByDate(postComments).map((comment: IComment) => (
                    <Comment key={comment.id} {...comment} />
                ))}
            </Stack>
        </Box>
    );
};
