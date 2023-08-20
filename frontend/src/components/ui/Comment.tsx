import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useGetUser } from "../../hooks/users/useGetUser";
import { formatDate } from "../../utils/formatDate";
import defaultAvatar from "../../assets/default.webp";
import { Link } from "react-router-dom";

interface CommentProps {
    authorId: string;
    createdAt: string;
    content: string;
}

const Comment = (props: CommentProps) => {
    const authorQuery = useGetUser(props.authorId);

    if (!authorQuery.isSuccess) {
        return null;
    }

    return (
        <Stack direction="row">
            <Box
                component="img"
                src={authorQuery.data.avatar || defaultAvatar}
                alt=""
                sx={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "12px",
                }}
            />
            <Box>
                <Stack direction="row" spacing={1}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        <Link to={`/profile/${props.authorId}`} style={{ color: "inherit", textDecoration: "none" }}>
                            {authorQuery.data.username}
                        </Link>
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 500,
                            opacity: 0.8,
                        }}
                    >
                        {formatDate(props.createdAt)}
                    </Typography>
                </Stack>
                <Typography
                    variant="body1"
                    sx={(theme) => ({
                        [theme.breakpoints.down("sm")]: {
                            fontSize: "1em",
                        },
                    })}
                >
                    {props.content}
                </Typography>
            </Box>
        </Stack>
    );
};

export default Comment;