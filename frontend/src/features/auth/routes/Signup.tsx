import { SignupForm } from "../components/SignupForm";
import { useState } from "react";
import { PreviewAvatar } from "../../../components/Elements/PreviewAvatar";
import AuthLayout from "../components/AuthLayout";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

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

export default Signup;
