import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { FormInputField } from "../../../components/Elements/FormInputField";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import { useMediaQuery, Theme } from "@mui/material";
import { useUpdatePostMutation } from "..";
import { Dispatch, SetStateAction } from "react";
import { Spinner } from "../../../components/Elements/Spinner";
import { postSchema } from "./CreatePostForm";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";

interface IEditPostForm {
    postId: string;
    title: string;
    preview: string;
    content: string;
    setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export const EditPostForm = (props: IEditPostForm) => {
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const { register, control, setValue, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(postSchema) });
    useEffect(() => {
        setValue("title", props.title);
        setValue("preview", props.preview);
        setValue("content", props.content);
    }, []);

    const { mutate: updatePost, isLoading: isPostUpdating } = useUpdatePostMutation(props.postId);
    const editPost = (newPostData: FieldValues) => {
        const formData = new FormData();
        formData.append("title", newPostData.title);
        formData.append("preview", newPostData.preview);
        formData.append("content", newPostData.content);
        if (newPostData?.postImg.length!==0) {
            formData.append("postImg", newPostData.postImg[0]);
        }
        updatePost(formData);
        props.setIsEdit(false);
    };

    if (isPostUpdating) {
        return <Spinner />;
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(editPost)}
            sx={{ marginBottom: 2 }}
        >
            <FormInputField
                name="title"
                control={control}
                type="text"
                fullWidth
                required
                margin="normal"
                placeholder="Write your title here..."
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
                placeholder="Write your preview here..."
                multiline
                rows={3}
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
                    size={isSmallScreen ? "small" : "large"}
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
                    size={isSmallScreen ? "small" : "large"}
                >
            Save
                </Button>
            </Stack>
        </Box>
    );
};