import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CustomContainer from "../components/ui/CustomContainer";
import { FieldValues, useForm } from "react-hook-form";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { FormInputField } from "../components/form/FormInputField";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../features/auth/authSlice";
import { useCreatePost } from "../hooks/posts/useCreatePost";

const PostForm = (props: { user: User, accessToken: string }) => {
    const { handleSubmit, control, register, reset } = useForm();

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
        <Box
            component="form"
            onSubmit={handleSubmit(publishPost)}
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
                    whiteSpace: "pre-line"
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


const Writing = () => {
    return (
        <CustomContainer>
            <Box
                sx={{
                    margin: "1.5em 0",
                }}
            >
                <Typography gutterBottom variant="h1">Creating a Fresh Blog Entry</Typography>
                <PostForm
                    user={useSelector(selectCurrentUser)}
                    accessToken={useSelector(selectCurrentToken)}
                />
            </Box>
        </CustomContainer>
    );
};

export default Writing;