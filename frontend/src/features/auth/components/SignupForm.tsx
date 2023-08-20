import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../api/register";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { convertToFormData } from "../../../utils/convertToFormData";
import { Dispatch, SetStateAction } from "react";
import { useMediaQuery, Theme } from "@mui/material";
import { Spinner } from "../../../components/Elements/Spinner";

const signupFormSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    password2: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Passwords do not match"),
    firstName: yup.string().required(),
    lastName: yup.string().required().defined(),
    bio: yup.string().max(120, "Bio must be less than 120 characters"),
    avatar: yup.mixed(),
});
type ISignupForm = yup.InferType<typeof signupFormSchema>;

type Props = {
    preview: string | ArrayBuffer | null;
    avatarImg: File | null;
    setAvatarImg: Dispatch<SetStateAction<File | null>>;
};

export const SignupForm = (props: Props) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ISignupForm>({
        resolver: yupResolver<ISignupForm>(signupFormSchema),
    });
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm"),
    );
    const { mutate: registerUser, isLoading } = useRegisterMutation();
    const handleRegister = (signupData: ISignupForm) => {
        const signupDataTrim = {
            avatar: props.avatarImg || "",
            username: signupData.username.trim(),
            password: signupData.password.trim(),
            fullName: `${signupData.firstName.trim()} ${signupData.lastName.trim()}`,
            bio: signupData.bio,
        };
        registerUser(convertToFormData(signupDataTrim));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(handleRegister)}
            sx={{ mt: 1 }}
        >
            <TextField
                {...register("username")}
                size={isSmallScreen ? "small" : "medium"}
                type="text"
                label="Username"
                fullWidth
                required
                margin="dense"
                autoFocus
            />
            <TextField
                {...register("password")}
                size={isSmallScreen ? "small" : "medium"}
                type="password"
                label="Password"
                fullWidth
                required
                margin="dense"
            />
            <TextField
                {...register("password2")}
                size={isSmallScreen ? "small" : "medium"}
                type="password"
                label="Password"
                fullWidth
                required
                margin="dense"
            />
            <Typography
                color="error"
                variant="body1"
                sx={{ fontWeight: 500, pb: 1 }}
            >
                {errors.password2?.message}
            </Typography>
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    marginTop: "8px",
                    marginBottom: "4px",
                }}
            >
                <TextField
                    {...register("firstName")}
                    size={isSmallScreen ? "small" : "medium"}
                    type="text"
                    label="First Name"
                    fullWidth
                    required
                />
                <TextField
                    {...register("lastName")}
                    size={isSmallScreen ? "small" : "medium"}
                    type="text"
                    label="Last Name"
                    fullWidth
                    required
                />
            </Stack>
            <TextField
                {...register("bio")}
                size={isSmallScreen ? "small" : "medium"}
                type="text"
                label="Bio"
                fullWidth
                required
                margin="dense"
                placeholder="Tell us about yourself..."
                multiline
                rows={2}
            />
            <Typography
                color="error"
                variant="body1"
                sx={{ fontWeight: 500, pb: 1 }}
            >
                {errors.bio?.message}
            </Typography>
            {!props.preview && (
                <Button
                    variant="outlined"
                    component="label"
                    endIcon={<AddAPhotoIcon />}
                    size="large"
                    fullWidth
                    sx={{
                        marginTop: "8px",
                        marginBottom: "4px",
                    }}
                >
                    Upload
                    <input
                        {...register("avatar")}
                        name="avatar"
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={(e) => {
                            if (!e.target.files) {
                                props.setAvatarImg(null);
                            } else {
                                props.setAvatarImg(e.target.files[0]);
                            }
                        }}
                    />
                </Button>
            )}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign Up
            </Button>
        </Box>
    );
};
