import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/slices/authSlice";
import { CustomContainer } from "../../../components/Layout/CustomContainer";
import { useGetSinglePostQuery } from "../api/getSinglePost";
import { CommentSection } from "../../comments/components/CommentSection";
import RenderedPost from "../components/RenderedPost";
import { Spinner } from "../../../components/Elements/Spinner";
import { useState } from "react";
import { EditPostForm } from "../components/EditPostForm";

const Post = () => {
    const { postId } = useParams();
    const user = useSelector(selectCurrentUser);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const { data: post, isSuccess, isLoading } = useGetSinglePostQuery(postId || "");
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
                    postId={post.id}
                    title={post.title}
                    content={post.content}
                    preview={post.preview}
                    setIsEdit={setIsEdit}
                />
                :
                <RenderedPost 
                    title={post.title}
                    content={post.content}
                    isEditAllowed={post.author.id===user?.id} 
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    postImage={post.postImg}
                />}
            {!isEdit && <CommentSection postId={postId || ""} />}
        </CustomContainer>
    );
};

export default Post;