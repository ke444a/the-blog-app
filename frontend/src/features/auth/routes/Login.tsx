import { LoginForm } from "../components/LoginForm";
import AuthLayout from "../components/AuthLayout";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <AuthLayout>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "primary.main",
                    padding: "0 20px",
                    justifyContent: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "info.light" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography
                    variant="h2"
                    sx={{
                        color: "info.light",
                    }}
                >
                    Login
                </Typography>
                <LoginForm />
                <Box
                    sx={{
                        fontWeight: 500,
                    }}
                >
                    Don't have an account?{" "}
                    <Box
                        component={Link}
                        to="/auth/register"
                        sx={{
                            color: "info.light",
                            textUnderlineOffset: "0.2em",
                            textAlign: "center",
                        }}
                    >
                        Sign up
                    </Box>
                </Box>
            </Box>
        </AuthLayout>
    );
};

export default Login;
