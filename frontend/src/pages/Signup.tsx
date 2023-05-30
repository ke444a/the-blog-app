import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/auth/useRegister";
import { setCredentials } from "../features/auth/authSlice";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { FormInputField } from "../components/form/FormInputField";
import { Link } from "react-router-dom";
import loginBg from "../assets/loginBg.jpeg";
import { useState, useEffect } from "react";

const Signup = () => {
    const { handleSubmit, control, register } = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [avatarImg, setAvatarImg] = useState<File | null>(null);

    const onRegisterSuccess = (data: UserStoreData) => {
        dispatch(setCredentials(data));
        localStorage.setItem("userId", data.user?._id || "");
        navigate("/home", { replace: true });
    };
    const registerMutation = useRegister(onRegisterSuccess);

    const handleRegister = (registerData: FieldValues) => {
        const formData = new FormData();
        formData.append("username", registerData.username);
        formData.append("password", registerData.password);
        formData.append("fullName", registerData.firstName + " " + registerData.lastName);
        if (avatarImg) {
            formData.append("avatar", avatarImg);
        }
        if (registerData?.bio) {
            formData.append("bio", registerData.bio);
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
                    variant="h2"
                    align="center"
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
                        color: "primary.main",
                        padding: "0 20px",
                        justifyContent: "center"
                    }}
                >
                    {preview ? 
                        <Avatar
                            component="img"
                            src={preview as string}
                            onClick={() => setAvatarImg(null)}
                            sx={{
                                width: "90px",
                                height: "90px",
                                borderRadius: "50%",
                                margin: "4px",
                                cursor: "pointer"
                            }}
                        />
                        : 
                        <Avatar sx={{ m: 1, bgcolor: "info.light" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    }

                    <Typography
                        variant="h2"
                        sx={{
                            color: "info.light",
                        }}
                    >
              Sign Up
                    </Typography>
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
                            maxLength={150}
                        />
                        {!preview &&
                        (<Button
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
                        </Button>)}
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
                            textAlign: "center"
                        }}
                    >
              Already have an account?
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
            </Grid>
        </Grid>
    );
};

export default Signup;
