import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { FormInputField } from "./FormInputField";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useUpdatePost } from "../../hooks/posts/useUpdatePost";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface IEditPostForm {
    postId: string;
    title: string;
    preview: string;
    content: string;
    setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export const EditPostForm = (props: IEditPostForm) => {
    const queryClient = useQueryClient();
    const accessToken = useSelector(selectCurrentToken);
    const { register, control, setValue, handleSubmit } = useForm();
    useEffect(() => {
        setValue("title", props.title);
        setValue("preview", props.preview);
        setValue("content", props.content);
    }, []);

    const onEditSuccess = () => {
        toast.success("Post has been updated", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        queryClient.invalidateQueries(["posts", "single"]);
        props.setIsEdit(false);
    };
    const updatePostMutation = useUpdatePost(props.postId, accessToken, onEditSuccess);
    const editPost = (newPostData: FieldValues) => {
        const formData = new FormData();
        formData.append("title", newPostData.title);
        formData.append("preview", newPostData.preview);
        formData.append("content", newPostData.content);
        if (newPostData?.postImg.length!==0) {
            formData.append("postImg", newPostData.postImg[0]);
        }
        updatePostMutation.mutate(formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(editPost)}>
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
                rows={16}
                sx={{
                    whiteSpace: "pre-line",
                }}
            />
            <Stack direction="row" spacing={2} alignItems="center">
                <Button
                    variant="outlined"
                    component="label"
                    endIcon={<AddAPhotoIcon />}
                    size="large"
                >
            New preview
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
                    endIcon={<SaveAsIcon />}
                    size="large"
                >
            Save
                </Button>
            </Stack>
        </Box>
    );
};