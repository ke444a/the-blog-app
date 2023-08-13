import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../api/register";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Button from "@mui/material/Button";
import { FormInputField } from "../../../components/Elements/FormInputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { convertToFormData } from "../../../utils/convertToFormData";
import { Dispatch, SetStateAction } from "react";

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
        control,
        register,
        formState: { errors },
    } = useForm<ISignupForm>({
        resolver: yupResolver<ISignupForm>(signupFormSchema),
    });
    const { mutate: registerUser } = useRegisterMutation();
    const handleRegister = (signupData: ISignupForm) => {
        const signupDataTrim = {
            avatar: props.avatarImg || "",
            username: signupData.username.trim(),
            password: signupData.password.trim(),
            fullName: `${signupData.firstName.trim()} ${signupData.lastName.trim()}`,
        };
        registerUser(convertToFormData(signupDataTrim));
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(handleRegister)}
            sx={{ mt: 1 }}
        >
            <FormInputField
                name="username"
                control={control}
                label="Username"
                fullWidth
                required
                margin="dense"
                autoFocus
                type="text"
            />
            <FormInputField
                name="password"
                control={control}
                label="Password"
                fullWidth
                required
                margin="dense"
                type="password"
            />
            <FormInputField
                name="password2"
                control={control}
                label="Confirm password"
                fullWidth
                required
                margin="dense"
                type="password"
            />
            <Typography color="error" variant="body1" sx={{ fontWeight: 500, pb: 1 }}>
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
                <FormInputField
                    name="firstName"
                    control={control}
                    label="First Name"
                    fullWidth
                    required
                    type="text"
                />
                <FormInputField
                    name="lastName"
                    control={control}
                    label="Last Name"
                    fullWidth
                    required
                    type="text"
                />
            </Stack>
            <FormInputField
                name="bio"
                control={control}
                label="Bio"
                fullWidth
                type="text"
                margin="dense"
                placeholder="Tell us about yourself..."
                multiline
                rows={2}
                maxLength={250}
            />
            <Typography color="error" variant="body1" sx={{ fontWeight: 500, pb: 1 }}>
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
