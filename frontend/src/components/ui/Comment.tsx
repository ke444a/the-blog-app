import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useGetUser } from "../../hooks/users/useGetUser";
import { formatDate } from "../../utils/formatDate";

type CommentProps = {
    authorId: string;
    createdAt: string;
    content: string;
    accessToken: string;
}

const Comment = (props: CommentProps) => {
    const authorQuery = useGetUser(props.authorId, props.accessToken);

    if (!authorQuery.isSuccess) {
        return null;
    }

    return (
        <Stack direction="row">
            <Box 
                component="img" 
                src={authorQuery.data.avatar}
                alt="" 
                sx={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "12px"
                }} 
            />
            <Box>
                <Stack direction="row" spacing={1}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 700
                        }}
                    >
                        {authorQuery.data.username}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 500,
                            opacity: .8
                        }}
                    >
                        {formatDate(props.createdAt)}
                    </Typography>
                </Stack>
                <Typography
                    variant="body1"
                >
                    {props.content}
                </Typography>
            </Box>
        </Stack>
    );
};

export default Comment;