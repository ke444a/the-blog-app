import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { FieldValues, useForm } from "react-hook-form";
import { FormInputField } from "../../../components/Elements/FormInputField";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import defaultAvatar from "../../../assets/images/default_avatar.webp";
import { useMediaQuery, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IUserFormProps {
    avatarImg: Blob | File | null;
    setAvatarImg: Dispatch<SetStateAction<File | null | Blob>>;
    user: IUser | null;
    handleProfileEdit: (data: FieldValues) => void;
}

const userSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    bio: yup.string().max(120, "Bio must be less than 120 characters"),
    avatar: yup.mixed(),
});
type IUserForm = yup.InferType<typeof userSchema>;

export const EditUserForm = (props: IUserFormProps) => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(props.user?.avatar as string || "");
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<IUserForm>({ 
        resolver: yupResolver<IUserForm>(userSchema) 
    });
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));  

    useEffect(() => {
        if (props.user?.fullName) {
            const fullName = props.user.fullName.split(" ");
            setValue("firstName", fullName[0]);
            setValue("lastName", fullName[1]);
        }
        if (props.user?.username) {
            setValue("username", props.user.username);
        }
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
        <Box component="form" onSubmit={handleSubmit(props.handleProfileEdit)}>
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
                        sx={{
                            ".MuiInputBase-input": {
                                fontSize: "1rem",
                                lineHeight: "1.5",
                            },
                        }}
                    />

                    <FormInputField
                        name="lastName"
                        control={control}
                        fullWidth
                        required
                        margin="dense"
                        type="text"
                        placeholder="Last name"
                        sx={{
                            ".MuiInputBase-input": {
                                fontSize: "1rem",
                                lineHeight: "1.5",
                            },
                        }}
                    />
                    <FormInputField
                        name="username"
                        control={control}
                        type="text"
                        required
                        margin="dense"
                        placeholder="Username"
                        fullWidth
                        sx={{
                            ".MuiInputBase-input": {
                                fontSize: "1rem",
                                lineHeight: "1.5",
                            },
                        }}
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
                        maxLength={120}
                        sx={{
                            ".MuiInputBase-input": {
                                fontSize: "1rem",
                                lineHeight: "1.5",
                            },
                        }}
                    />
                    <Typography
                        color="error"
                        variant="body1"
                        sx={{ fontWeight: 500, pb: 1 }}
                    >
                        {errors.bio?.message}
                    </Typography>
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
                    <Button
                        type="submit"
                        size="medium"
                        color="success"
                        variant="outlined"
                        sx={{
                            fontWeight: 500,
                            width: "100%",
                            py: 1
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};
