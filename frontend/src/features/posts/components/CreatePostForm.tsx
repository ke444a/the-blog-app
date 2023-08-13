import { useCreatePostMutation } from "..";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FieldValues, useForm } from "react-hook-form";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { FormInputField } from "../../../components/Elements/FormInputField";
import { Spinner } from "../../../components/Elements/Spinner";
import { Dispatch, SetStateAction } from "react";
import { useMediaQuery, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { convertToFormData } from "../../../utils/convertToFormData";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/slices/authSlice";

interface CreatePostFormProps {
  setTitle: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
  setPostImage: Dispatch<SetStateAction<string>>;
}

export const postSchema = yup.object({
    title: yup.string().required().max(100, "Title must be less than 100 characters"),
    preview: yup.string().required().max(120, "Preview must be less than 120 characters"),
    content: yup.string().required(),
    postImg: yup.mixed().required()
});
type IPostForm = yup.InferType<typeof postSchema>;


export const CreatePostForm = (props: CreatePostFormProps) => {
    const { handleSubmit, control, register, watch, formState: { errors } } = useForm<IPostForm>({ resolver: yupResolver<IPostForm>(postSchema) });
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const { mutate: createPost, isLoading } = useCreatePostMutation();
    const user = useSelector(selectCurrentUser);

    const publishPost = (postData: IPostForm) => {
        createPost(convertToFormData({
            ...postData,
            postImg: (postData.postImg as FileList)[0],
            authorId: user?.id || ""
        }));
    };

    const handleFormChange = () => {
        props.setTitle(watch("title"));
        props.setContent(watch("content"));
        const postImg = watch("postImg") as FileList;
        if (postImg.length > 0) {
            props.setPostImage(URL.createObjectURL(postImg[0]));
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(publishPost)}
            onChange={handleFormChange}
            sx={{
                mt: 2,
            }}
        >
            <FormInputField
                name="title"
                control={control}
                type="text"
                fullWidth
                required
                margin="normal"
                placeholder="Title..."
                variant="standard"
                sx={{
                    ".MuiInputBase-input": {
                        fontWeight: 600,
                        fontSize: "1.4em",
                    },
                }}
            />
            <Typography
                color="error"
                variant="body1"
                sx={{ fontWeight: 500, pb: 1 }}
            >
                {errors.title?.message}
            </Typography>
            <FormInputField
                name="preview"
                control={control}
                type="text"
                fullWidth
                required
                margin="normal"
                placeholder="Preview..."
                multiline
                rows={2}
                variant="standard"
            />
            <Typography
                color="error"
                variant="body1"
                sx={{ fontWeight: 500, pb: 1 }}
            >
                {errors.preview?.message}
            </Typography>
            <FormInputField
                name="content"
                control={control}
                type="text"
                fullWidth
                required
                margin="normal"
                placeholder="Content..."
                multiline
                rows={14}
                variant="standard"
                sx={{
                    whiteSpace: "pre-line",
                }}
            />
            <Stack direction="row" spacing={2} alignItems="center">
                <Button
                    variant="text"
                    component="label"
                    endIcon={<AttachFileIcon />}
                    size={isSmallScreen ? "small" : "large"}
                >
            Add Cover
                    <input
                        {...register("postImg")}
                        name="postImg"
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        required
                    />
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<SendSharpIcon />}
                    size={isSmallScreen ? "small" : "large"}
                >
            Publish
                </Button>
            </Stack>
        </Box>
    );
};
