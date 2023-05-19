import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

interface IUser {
    username: string;
    bio: string;
    fullName: string;
    profileImg: string;
}

const Profile = (props: IUser) => {
    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    display: "flex",
                    marginTop: "25px",
                }}
            >
                <Box
                    component="img"
                    sx={{
                        width: "200px",
                        height: "200px",
                        marginRight: "35px",
                        borderRadius: "50%",
                    }}
                    src={props.profileImg}
                    alt=""
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h2">{props.fullName}</Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            opacity: 0.8,
                            marginBottom: "20px",
                            fontSize: "1em",
                            fontWeight: 500,
                        }}
                    >
            @{props.username}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 500,
                        }}
                    >
                        {props.bio}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Profile;