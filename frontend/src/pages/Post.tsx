import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import CustomContainer from "../components/ui/CustomContainer";
import { useGetSinglePost } from "../hooks/posts/useGetSinglePost";
import CommentSection from "../components/ui/CommentSection";
import RenderedPost from "../components/ui/RenderedPost";
import { Spinner } from "../components/ui/Spinner";
import { useState } from "react";
import { EditPostForm } from "../components/form/EditPostForm";

const Post = () => {
    const postId = useLocation().pathname.split("/")[2];
    const user = useSelector(selectCurrentUser);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const { data: post, isSuccess, isLoading } = useGetSinglePost(postId);
    if (!isSuccess) {
        return null;
    }
    if (isLoading) {
        return <Spinner />;
    }

    return (
        <CustomContainer maxWidth="xl">
            {isEdit ?
                <EditPostForm 
                    postId={post._id}
                    title={post.title}
                    content={post.content}
                    preview={post.preview}
                    setIsEdit={setIsEdit}
                />
                :
                <RenderedPost 
                    title={post.title}
                    content={post.content}
                    isEditAllowed={post.authorId===user?._id} 
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                />}
            {!isEdit && <CommentSection postId={postId} />}
        </CustomContainer>
    );
};

export default Post;