import { useCreatePostMutation } from "../api/createPost";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Typography from "@mui/material/Typography";
import { Spinner } from "../../../components/Elements/Spinner";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useMediaQuery, Theme, TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { convertToFormData } from "../../../utils/convertToFormData";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/slices/authSlice";
import { useUpdatePostMutation } from "../api/updatePost";
import { useNavigate } from "react-router-dom";

interface IPostFormProps extends Partial<IPost> {
    setTitle: Dispatch<SetStateAction<string>>;
    setPreview: Dispatch<SetStateAction<string>>;
    setContent: Dispatch<SetStateAction<string>>;
    setPostImg: Dispatch<SetStateAction<string | File>>;
    isEdit?: boolean;
    setIsEdit?: Dispatch<SetStateAction<boolean>>;
}

export const postValidationSchema = yup.object({
    title: yup
        .string()
        .required("Title is required")
        .max(100, "Title must be less than 100 characters"),
    preview: yup
        .string()
        .required("Preview is required")
        .max(120, "Preview must be less than 120 characters"),
    content: yup.string().required("Content is required"),
    postImg: yup
        .mixed()
        .test("postImgLength", "Post image is required", (value) => {
            if (value instanceof FileList) {
                return value.length > 0;
            }
            return true;
        }),
});
export type PostForm = yup.InferType<typeof postValidationSchema>;

export const PostForm = (props: IPostFormProps) => {
    const {
        handleSubmit,
        register,
        formState: { errors, isDirty },
        watch,
    } = useForm<PostForm>({
        resolver: yupResolver<PostForm>(postValidationSchema),
        defaultValues: {
            title: props.title || "",
            preview: props.preview || "",
            content: props.content || "",
            postImg: props.postImg,
        },
    });
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm"),
    );
    const {
        mutate: createPost,
        isLoading: isPostCreating,
        isSuccess: isCreatingSuccess,
    } = useCreatePostMutation();
    const {
        mutate: updatePost,
        isLoading: isPostUpdating,
        isSuccess: isUpdatingSuccess,
    } = useUpdatePostMutation(props.id || "");
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    const handleFormSubmit = (formData: PostForm) => {
        const postData = {
            ...formData,
            postImg: (formData.postImg as FileList)[0],
        };

        if (!isDirty && props.setIsEdit) {
            props.setIsEdit(false);
        }

        props.isEdit
            ? updatePost(convertToFormData(postData))
            : createPost(
                convertToFormData({ ...postData, authorId: user?.id }),
            );
    };

    useEffect(() => {
        const postImg = watch("postImg");
        if (postImg instanceof FileList && postImg.length > 0) {
            props.setPostImg(URL.createObjectURL(postImg[0]));
        }
    }, [watch("postImg")]);

    useEffect(() => {
        props.setTitle(props.title || "");
        props.setContent(props.content || "");
        props.setPostImg(props.postImg || "");
        props.setPreview(props.preview || "");
    }, []);

    useEffect(() => {
        if (isCreatingSuccess || isUpdatingSuccess) {
            navigate("/");
        }
    }, [isCreatingSuccess, isUpdatingSuccess]);

    if (isPostCreating || isPostUpdating) {
        return <Spinner />;
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(handleFormSubmit)}
            sx={{
                mt: 2,
            }}
            noValidate
        >
            <TextField
                {...register("title")}
                size={isSmallScreen ? "small" : "medium"}
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
                onChange={(e) => props.setTitle(e.target.value)}
            />
            <Typography
                color="error"
                variant="body1"
                sx={{ fontWeight: 500, pb: 1 }}
            >
                {errors.title?.message}
            </Typography>
            <TextField
                {...register("preview")}
                size={isSmallScreen ? "small" : "medium"}
                type="text"
                fullWidth
                required
                margin="normal"
                placeholder="Preview..."
                multiline
                rows={2}
                variant="standard"
                onChange={(e) => props.setPreview(e.target.value)}
            />
            <Typography
                color="error"
                variant="body1"
                sx={{ fontWeight: 500, pb: 1 }}
            >
                {errors.preview?.message}
            </Typography>
            <TextField
                {...register("content")}
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
                onChange={(e) => props.setContent(e.target.value)}
            />
            <Typography
                color="error"
                variant="body1"
                sx={{ fontWeight: 500, pb: 1 }}
            >
                {errors.content?.message}
            </Typography>
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
            <Typography
                color="error"
                variant="body1"
                sx={{ fontWeight: 500, pb: 1 }}
            >
                {errors.postImg?.message}
            </Typography>
        </Box>
    );
};
