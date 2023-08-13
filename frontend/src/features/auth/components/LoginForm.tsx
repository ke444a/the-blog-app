import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { FormInputField } from "../../../components/Elements/FormInputField";
import { useLoginMutation } from "../api/login";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const loginFormSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});
type ILoginForm = yup.InferType<typeof loginFormSchema>;


export const LoginForm = () => {
    const { handleSubmit, control, setValue } = useForm<ILoginForm>({
        resolver: yupResolver(loginFormSchema),
    });
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
