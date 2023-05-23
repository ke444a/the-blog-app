import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useForm } from "react-hook-form";
import { FormInputField } from "./FormInputField";
import { useState, useEffect, forwardRef, ForwardedRef } from "react";
import defaultAvatar from "../../assets/profile.png";

const EditForm = forwardRef((props: UserReturnData, ref: ForwardedRef<HTMLFormElement>) => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(props.user?.avatar);
    const [avatarImg, setAvatarImg] = useState<File | null>(null);
    const { register, control } = useForm();

    useEffect(() => {
        if (avatarImg) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(avatarImg);
        } else if (preview!==props.user.avatar) {
            setPreview(null);
        }
    }, [avatarImg]);

    return (
        <Box component="form" ref={ref}>
            <Stack direction="row" spacing={1}>
                <Avatar
                    src={preview ? (preview as string) : defaultAvatar}
                    onClick={() => (preview ? setAvatarImg(null) : null)}
                    alt=""
                    sx={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        marginRight: "25px",
                    }}
                />
                <Box>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            marginBottom: "4px",
                        }}
                    >
                        <FormInputField
                            name="firstName"
                            control={control}
                            fullWidth
                            required
                            type="text"
                            placeholder="First name"
                        />
                        <FormInputField
                            name="lastName"
                            control={control}
                            fullWidth
                            required
                            type="text"
                            placeholder="Last name"
                        />
                    </Stack>
                    <FormInputField
                        name="username"
                        control={control}
                        type="text"
                        required
                        margin="dense"
                        placeholder="Username"
                        fullWidth
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
                        rows={2}
                    />
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
                                    setAvatarImg(null);
                                } else {
                                    setAvatarImg(e.target.files[0]);
                                }
                            }}
                        />
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
});

export default EditForm;
