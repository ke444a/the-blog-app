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

interface CreatehPostFormProps {
  user: IUser | null;
  setTitle: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
}

export const CreatePostForm = (props: CreatehPostFormProps) => {
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
    };

    if (createPostMutation.isLoading) {
        return <Spinner />;
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(publishPost)}
            onChange={handleFormChange}
        >
            <FormInputField
                name="title"
                control={control}
                type="text"
                fullWidth
                required
                margin="normal"
                placeholder="Write your title here..."
                maxLength={150}
            />
            <FormInputField
                name="preview"
                control={control}
                type="text"
                fullWidth
                required
                margin="normal"
                placeholder="Write your preview here..."
                maxLength={500}
                multiline
                rows={3}
            />
            <FormInputField
                name="content"
                control={control}
                type="text"
                fullWidth
                required
                margin="normal"
                placeholder="Write your content here..."
                multiline
                rows={16}
                sx={{
                    whiteSpace: "pre-line",
                }}
            />
            <Stack direction="row" spacing={2} alignItems="center">
                <Button
                    variant="outlined"
                    component="label"
                    endIcon={<AttachFileIcon />}
                    size={isSmallScreen ? "small" : "large"}
                >
            Upload
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
