import { useEffect, Dispatch, SetStateAction } from "react";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

type Props = {
  avatarImg: File | null;
  setAvatarImg: Dispatch<SetStateAction<File | null>>;
  preview: string | ArrayBuffer | null;
  setPreview: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
};

export const PreviewAvatar = (props: Props) => {
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
