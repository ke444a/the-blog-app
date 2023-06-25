import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useForm } from "react-hook-form";
import { FormInputField } from "./FormInputField";
import { useState, useEffect, forwardRef, ForwardedRef, Dispatch, SetStateAction } from "react";
import defaultAvatar from "../../assets/default.webp";
import { useMediaQuery, Theme } from "@mui/material";

interface IUserFormProps {
    avatarImg: Blob | File | null;
    setAvatarImg: Dispatch<SetStateAction<File | null | Blob>>;
    user: IUser | null;
}

export const EditUserForm = forwardRef((props: IUserFormProps, ref: ForwardedRef<HTMLFormElement>) => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(props.user?.avatar || "");
    const { register, control, setValue } = useForm();
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));  

    useEffect(() => {
        setValue("firstName", props.user?.fullName.split(" ")[0]);
        setValue("lastName", props.user?.fullName.split(" ")[1]);
        setValue("username", props.user?.username);
        setValue("bio", props.user?.bio);
        setValue("avatar", props.user?.avatar);
    }, []);

    useEffect(() => {
        if (props.avatarImg) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(props.avatarImg);
        } else if (preview!==props.user?.avatar) {
            setPreview(null);
        }
    }, [props.avatarImg]);

    return (
        <Box component="form" ref={ref}>
            <Stack direction="column" spacing={1}>
                <Avatar
                    src={preview ? (preview as string) : defaultAvatar}
                    onClick={() => (preview ? props.setAvatarImg(null) : null)}
                    alt=""
                    sx={(theme) => ({
                        [theme.breakpoints.up("lg")]: {
                            width: "200px",
                            height: "200px",
                        },
                        [theme.breakpoints.up("sm")]: {
                            width: "120px",
                            height: "120px",
                        },
                        borderRadius: "50%",
                        width: "70px",
                        height: "70px",
                        margin: "0 auto 10px",
                    })}
                />
                <Box>
                    <FormInputField
                        name="firstName"
                        control={control}
                        fullWidth
                        required
                        margin="dense"
                        type="text"
                        placeholder="First name"
                        sx={(theme) => ({
                            ".MuiInputBase-input": {
                                fontSize: "1rem",
                                lineHeight: "1.5"
                            },
                        })}
                    />
                    <FormInputField
                        name="lastName"
                        control={control}
                        fullWidth
                        required
                        margin="dense"
                        type="text"
                        placeholder="Last name"
                        sx={(theme) => ({
                            ".MuiInputBase-input": {
                                fontSize: "1rem",
                                lineHeight: "1.5",
                            },
                        })}
                    />
                    <FormInputField
                        name="username"
                        control={control}
                        type="text"
                        required
                        margin="dense"
                        placeholder="Username"
                        fullWidth
                        sx={(theme) => ({
                            ".MuiInputBase-input": {
                                fontSize: "1rem",
                                lineHeight: "1.5",
                            },
                        })}
                    />
                    <FormInputField
                        name="bio"
                        control={control}
                        type="text"
                        required
                        margin="dense"
                        placeholder="Information about yourself"
                        fullWidth
                        multiline
                        rows={3}
                        sx={(theme) => ({
                            ".MuiInputBase-input": {
                                fontSize: "1rem",
                                lineHeight: "1.5"
                            },
                        })}
                    />
                    <Button
                        variant="outlined"
                        component="label"
                        endIcon={<AddAPhotoIcon />}
                        fullWidth
                        size={isSmallScreen ? "small" : "large"}
                        sx={{
                            marginTop: 2,
                            marginBottom: 1,
                        }}
                    >
              Update avatar
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
                </Box>
            </Stack>
        </Box>
    );
});
