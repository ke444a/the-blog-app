import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormInputField } from "../components/form/FormInputField";
import loginBg from "../assets/loginBg.jpeg";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import type { AppDispatch } from "../app/store";
import { useLogin } from "../hooks/auth/useLogin";

const Login = () => {
    const { handleSubmit, control } = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onLoginSuccess = (data: UserStoreData) => {
        dispatch(setCredentials(data));
        localStorage.setItem("userId", data.user?._id || "");
        navigate("/home", { replace: true });
    };
    const loginMutation = useLogin(onLoginSuccess);

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
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Typography 
                    component="h1" 
                    variant="h2" align="center" 
                    sx={{
                        marginTop: 6,
                    }}
                    gutterBottom
                >
                    Welcome to the Blogging App!
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        color: "primary.main"
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "info.light" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h2" sx={{
                        color: "info.light"
                    }}>
                        Login
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(data => loginMutation.mutate(data as UserLoginCredentials))}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <FormInputField
                            name="username"
                            control={control}
                            label="Username"
                            fullWidth
                            required
                            margin="normal"
                            autoFocus
                            type="text"
                        />
                        <FormInputField
                            name="password"
                            control={control}
                            label="Password"
                            fullWidth
                            required
                            margin="normal"
                            type="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            fontWeight: 500,
                        }}
                    >
                        Don't have an account?
                        <Box
                            component={Link}
                            to="/register"
                            sx={{
                                color: "info.light",
                                marginLeft: "0.5em",
                                textUnderlineOffset: "0.2em",
                            }}
                        >
                            Sign up
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
