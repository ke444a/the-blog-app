import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormInputField } from "../components/form/FormInputField";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import type { AppDispatch } from "../app/store";
import { useLogin } from "../hooks/auth/useLogin";
import AuthLayout from "../components/ui/AuthLayout";

const Login = () => {
    const { handleSubmit, control } = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onLoginSuccess = (data: IUserStoreData) => {
        dispatch(setCredentials(data));
        navigate("/home", { replace: true });
    };
    const loginMutation = useLogin(onLoginSuccess);

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
                <Box
                    component="form"
                    onSubmit={handleSubmit((data) =>
                        loginMutation.mutate(data as IUserLoginCredentials)
                    )}
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
            Don't have an account?{" "}
                    <Box
                        component={Link}
                        to="/register"
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
