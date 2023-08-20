import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/auth/useRegister";
import { setCredentials } from "../features/auth/authSlice";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { FormInputField } from "../components/form/FormInputField";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthLayout from "../components/ui/AuthLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; 

const signupSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    password2: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Passwords do not match"),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    bio: yup.string().max(120, "Bio must be less than 120 characters"),
    avatar: yup.mixed()
});

const Signup = () => {
    const { handleSubmit, control, register, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchema)
    });
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [avatarImg, setAvatarImg] = useState<File | null>(null);

    const onRegisterSuccess = (data: IUserStoreData) => {
        dispatch(setCredentials(data));
        navigate("/home", { replace: true });
    };
    const registerMutation = useRegister(onRegisterSuccess);

    const handleRegister = (registerData: FieldValues) => {
        const formData = new FormData();
        formData.append("username", registerData.username.trim());
        formData.append("password", registerData.password.trim());
        formData.append("fullName", registerData.firstName.trim() + " " + registerData.lastName.trim());
        if (avatarImg) {
            formData.append("avatar", avatarImg);
        }
        if (registerData?.bio) {
            formData.append("bio", registerData.bio.trim());
        }
        registerMutation.mutate(formData);
    };

    useEffect(() => {
        if (avatarImg) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(avatarImg);
        } else {
            setPreview(null);
        }
    }, [avatarImg]);

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
                {preview ? (
                    <Avatar
                        src={preview as string}
                        onClick={() => setAvatarImg(null)}
                        sx={{
                            width: { xs: "90px", md: "130px" },
                            height: { xs: "90px", md: "130px" },
                            borderRadius: "50%",
                            margin: "4px",
                            cursor: "pointer",
                        }}
                    />
                ) : (
                    <>
                        <Avatar sx={{ m: 1, bgcolor: "info.light" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography
                            variant="h2"
                            sx={{
                                color: "info.light",
                            }}
                        >
                Sign Up
                        </Typography>
                    </>
                )}
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
                    <Typography
                        color="error"
                        variant="body1"
                        sx={{ fontWeight: 500, pb: 1 }}
                    >
                        {errors.bio?.message}
                    </Typography>
                    {!preview && (
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
                                        setAvatarImg(null);
                                    } else {
                                        setAvatarImg(e.target.files[0]);
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
                <Box
                    sx={{
                        fontWeight: 500,
                        textAlign: "center",
                    }}
                >
            Already have an account?{" "}
                    <Box
                        component={Link}
                        to="/login"
                        sx={{
                            color: "info.light",
                            textUnderlineOffset: "0.2em",
                        }}
                    >
              Login
                    </Box>
                </Box>
            </Box>
        </AuthLayout>
    );
};

export default Signup;
