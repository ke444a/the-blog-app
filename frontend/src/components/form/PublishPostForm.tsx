import { useCreatePost } from "../../hooks/posts/useCreatePost";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FieldValues, useForm } from "react-hook-form";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { FormInputField } from "./FormInputField";

interface PostFormProps {
    user: User;
    accessToken: string;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
}

export const PublishPostForm = (props: PostFormProps) => {
    const { handleSubmit, control, register, reset, watch } = useForm();

    props.setTitle(watch("title"));
    props.setContent(watch("content"));

    const createPostMutation = useCreatePost(props.accessToken, reset);

    const publishPost = (postData: FieldValues) => {
        const formData = new FormData();
        formData.append("title", postData.title);
        formData.append("preview", postData.preview);
        formData.append("content", postData.content);
        formData.append("postImg", postData.postImg[0]);
        formData.append("authorId", props.user._id);
        createPostMutation.mutate(formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(publishPost)}>
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
                maxLength={300}
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
                rows={9}
                sx={{
                    whiteSpace: "pre-line",
                }}
            />
            <Stack direction="row" spacing={2} alignItems="center">
                <Button
                    variant="outlined"
                    component="label"
                    endIcon={<AttachFileIcon />}
                    size="large"
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
                    size="large"
                >
            Publish
                </Button>
            </Stack>
        </Box>
    );
};
