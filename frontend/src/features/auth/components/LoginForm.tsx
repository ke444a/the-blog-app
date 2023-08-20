import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../api/login";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMediaQuery, Theme } from "@mui/material";

const loginFormSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});
type ILoginForm = yup.InferType<typeof loginFormSchema>;

export const LoginForm = () => {
    const { handleSubmit, setValue, register } = useForm<ILoginForm>({
        resolver: yupResolver(loginFormSchema),
    });
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm"),
    );
    const { mutate: login } = useLoginMutation();

    const loginSubmit = (loginData: ILoginForm) => {
        login({
            username: loginData.username.trim(),
            password: loginData.password.trim(),
        });
    };

    const handleDemoAccountClick = () => {
        setValue("username", "bobsmith");
        setValue("password", "Password@123");
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(loginSubmit)}
            noValidate
            sx={{ mt: 1 }}
        >
            <TextField
                {...register("username")}
                size={isSmallScreen ? "small" : "medium"}
                label="Username"
                type="text"
                fullWidth
                required
                margin="normal"
                autoFocus
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                {...register("password")}
                size={isSmallScreen ? "small" : "medium"}
                label="Password"
                type="password"
                fullWidth
                required
                margin="normal"
                autoFocus
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button
                type="button"
                fullWidth
                variant="outlined"
                color="primary"
                sx={{ mt: 3 }}
                onClick={handleDemoAccountClick}
            >
                Use Demo Account
            </Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 1, mb: 2 }}
            >
                Login
            </Button>
        </Box>
    );
};
