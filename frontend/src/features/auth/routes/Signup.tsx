import { SignupForm } from "../components/SignupForm";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Dispatch, SetStateAction, useEffect } from "react";

const Signup = () => {
    const [avatarImg, setAvatarImg] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

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
                <PreviewAvatar
                    avatarImg={avatarImg}
                    setAvatarImg={setAvatarImg}
                    preview={preview}
                    setPreview={setPreview}
                />
                <SignupForm
                    preview={preview}
                    avatarImg={avatarImg}
                    setAvatarImg={setAvatarImg}
                />
                <Box
                    sx={{
                        fontWeight: 500,
                        textAlign: "center",
                    }}
                >
                    Already have an account?{" "}
                    <Box
                        component={Link}
                        to="/auth/login"
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

type AvatarProps = {
    avatarImg: File | null;
    setAvatarImg: Dispatch<SetStateAction<File | null>>;
    preview: string | ArrayBuffer | null;
    setPreview: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
};

const PreviewAvatar = (props: AvatarProps) => {
    useEffect(() => {
        if (props.avatarImg) {
            const reader = new FileReader();
            reader.onloadend = () => {
                props.setPreview(reader.result);
            };
            reader.readAsDataURL(props.avatarImg);
        } else {
            props.setPreview(null);
        }
    }, [props.avatarImg]);

    return (
        <>
            {props.preview ? (
                <Avatar
                    src={props.preview as string}
                    onClick={() => props.setAvatarImg(null)}
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
        </>
    );
};

export default Signup;
