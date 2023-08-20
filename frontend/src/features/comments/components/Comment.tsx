import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { formatDate } from "../../../utils/formatDate";
import defaultAvatar from "../../../assets/images/default_avatar.webp";
import { Link } from "react-router-dom";

export const Comment = (props: IComment) => {
    return (
        <Stack direction="row">
            <Box
                component="img"
                src={(props.author.avatar as string) || defaultAvatar}
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
                        <Link
                            to={`/users/${props.author.id}`}
                            style={{ color: "inherit", textDecoration: "none" }}
                        >
                            {props.author.username}
                        </Link>
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 500,
                            opacity: 0.8,
                        }}
                    >
                        {formatDate(props.updatedAt)}
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
