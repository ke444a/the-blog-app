import { useCreatePost } from "../../hooks/posts/useCreatePost";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FieldValues, useForm } from "react-hook-form";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { FormInputField } from "./FormInputField";
import { Spinner } from "../ui/Spinner";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";
import { useMediaQuery, Theme } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CreatePostFormProps {
  user: IUser | null;
  setTitle: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
  setPostImage: Dispatch<SetStateAction<string>>;
}

export const CreatePostForm = (props: CreatePostFormProps) => {
    const { handleSubmit, control, register, reset, watch } = useForm();
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const navigate = useNavigate();

    const onPostCreateSuccess = () => {
        reset();
        toast.success("Post has been created");
        navigate("/home");
    };
    const createPostMutation = useCreatePost(onPostCreateSuccess);

    const publishPost = (postData: FieldValues) => {
        const formData = new FormData();
        formData.append("title", postData.title);
        formData.append("preview", postData.preview);
        formData.append("content", postData.content);
        formData.append("postImg", postData.postImg[0]);
        formData.append("authorId", props.user?._id || "");
        createPostMutation.mutate(formData);
    };

    const handleFormChange = () => {
        props.setTitle(watch("title"));
        props.setContent(watch("content"));
        if (watch("postImg").length > 0) {
            props.setPostImage(URL.createObjectURL(watch("postImg")[0]));
        }
    };

    if (createPostMutation.isLoading) {
        return <Spinner />;
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(publishPost)}
            onChange={handleFormChange}
            sx={{
                mt:2
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
                maxLength={100}
                variant="standard"
                sx={{
                    ".MuiInputBase-input": {
                        fontWeight: 600,
                        fontSize: "1.4em"
                    },
                }}
            />
            <FormInputField
                name="preview"
                control={control}
                type="text"
                fullWidth
                required
                margin="normal"
                placeholder="Preview..."
                maxLength={100}
                multiline
                rows={2}
                variant="standard"
            />
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
