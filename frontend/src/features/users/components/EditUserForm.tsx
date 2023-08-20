import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import defaultAvatar from "../../../assets/images/default_avatar.webp";
import { Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Spinner } from "../../../components/Elements/Spinner";
import { useUpdateUserMutation } from "../api/updateUser";

type Props = {
    user: IUser;
    setIsEditMode: Dispatch<SetStateAction<boolean>>;
};

const userSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    username: yup.string().required("Username is required"),
    bio: yup.string().max(120, "Bio must be less than 120 characters"),
    avatar: yup.mixed().nullable(),
});
type UserForm = yup.InferType<typeof userSchema>;

export const EditUserForm = (props: Props) => {
    const { mutate: updateUser, isLoading: isUserUpdating } =
        useUpdateUserMutation(props.user.id || "");
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
    } = useForm<UserForm>({
        resolver: yupResolver<UserForm>(userSchema),
        defaultValues: {
            firstName: props.user.fullName.split(" ")[0],
            lastName: props.user.fullName.split(" ")[1],
            username: props.user.username,
            bio: props.user.bio || "",
            avatar: props.user.avatar,
        },
    });
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm"),
    );
    const [avatarImg, setAvatarImg] = useState<File | Blob | null>(null);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(
        (props.user.avatar as string) || null,
    );

    const editProfile = (formData: UserForm) => {
        const { firstName, lastName, ...newFormData } = formData;
        const userData = {
            ...newFormData,
            fullName: `${firstName} ${lastName}`,
            id: props.user.id,
        };

        if (isDirty || avatarImg) {
            updateUser({
                ...userData,
                ...(avatarImg && { avatar: avatarImg as any }),
                avatarPath: preview as string,
            });
        }
        props.setIsEditMode(false);
    };

    if (isUserUpdating) {
        return <Spinner />;
    }

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(editProfile)}>
            <Stack direction="column" spacing={1}>
                <PreviewAvatar
                    avatarImg={avatarImg}
                    setAvatarImg={setAvatarImg}
                    preview={preview}
                    setPreview={setPreview}
                    currentAvatar={(props.user.avatar as string) || ""}
                />
                <Box>
                    <TextField
                        {...register("firstName")}
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
                    <Typography
                        color="error"
                        variant="body1"
                        sx={{ fontWeight: 500, pb: 1 }}
                    >
                        {errors.firstName?.message}
                    </Typography>
                    <TextField
                        {...register("lastName")}
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
                    <Typography
                        color="error"
                        variant="body1"
                        sx={{ fontWeight: 500, pb: 1 }}
                    >
                        {errors.lastName?.message}
                    </Typography>
                    <TextField
                        {...register("username")}
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
                    <Typography
                        color="error"
                        variant="body1"
                        sx={{ fontWeight: 500, pb: 1 }}
                    >
                        {errors.username?.message}
                    </Typography>
                    <TextField
                        {...register("bio")}
                        type="text"
                        required
                        margin="dense"
                        placeholder="Information about yourself"
                        fullWidth
                        multiline
                        rows={3}
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
                            hidden
                            accept="image/*"
                            multiple
                            type="file"
                            onChange={(e) => {
                                if (!e.target.files) {
                                    setAvatarImg(null);
                                    setValue("avatar", null);
                                } else {
                                    setAvatarImg(e.target.files[0]);
                                    setValue("avatar", e.target.files[0]);
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
                            py: 1,
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};

type AvatarProps = {
    avatarImg: File | Blob | null;
    setAvatarImg: Dispatch<SetStateAction<File | Blob | null>>;
    preview: string | ArrayBuffer | null;
    setPreview: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
    currentAvatar: string;
};

const PreviewAvatar = (props: AvatarProps) => {
    useEffect(() => {
        if (props.avatarImg) {
            const reader = new FileReader();
            reader.onloadend = () => {
                props.setPreview(reader.result);
            };
            reader.readAsDataURL(props.avatarImg);
        } else if (props.preview !== props.currentAvatar) {
            props.setPreview(null);
        }
    }, [props.avatarImg]);

    return (
        <Avatar
            src={props.preview ? (props.preview as string) : defaultAvatar}
            onClick={() => (props.preview ? props.setAvatarImg(null) : null)}
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
    );
};
