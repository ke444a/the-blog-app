import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useMutation } from "@tanstack/react-query";
import { createNewPost } from "../services/posts";
import { FormInputField } from "../components/form/FormInputField";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../features/auth/authSlice";

const PostForm = (props: { user: User, accessToken: string }) => {
    const { handleSubmit, control, register, reset } = useForm();

    const postMutation = useMutation({
        mutationFn: (formData: FormData) => createNewPost(formData, props.accessToken),
        onSuccess: () => {
            reset();
        }
    });

    const publishPost = (postData: any) => {
        const formData = new FormData();
        formData.append("title", postData.title);
        formData.append("preview", postData.preview);
        formData.append("content", postData.content);
        formData.append("postImg", postData.postImg[0]);
        formData.append("authorId", props.user._id);
        postMutation.mutate(formData);
    };

    return (
        <Box
            component="form"
            sx={{
                marginTop: "1.2em",
            }}
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
    const user: User = useSelector(selectCurrentUser);
    const accessToken: string = useSelector(selectCurrentToken);

    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    margin: "1.5em 0"
                }}
            >
                <Typography variant="h1">Creating a Fresh Blog Entry</Typography>
                <PostForm 
                    user={user}
                    accessToken={accessToken}
                />
            </Box>
        </Container>
    );
};

export default Writing;