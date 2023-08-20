import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import loginBg from "../../../assets/images/login_background.webp";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${loginBg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(1.5px)",
                }}
            />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    sx={{
                        marginTop: 6,
                    }}
                    gutterBottom
                >
                    Welcome to The Blog!
                </Typography>
                {children}
            </Grid>
        </Grid>
    );
};

export default AuthLayout;
