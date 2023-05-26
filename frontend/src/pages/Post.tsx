import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import CustomContainer from "../components/ui/CustomContainer";
import { useGetSinglePost } from "../hooks/posts/useGetSinglePost";
import CommentSection from "../components/ui/CommentSection";
import RenderedPost from "../components/ui/RenderedPost";
import { Spinner } from "../components/ui/Spinner";

const Post = () => {
    const postId = useLocation().pathname.split("/")[2];
    const accessToken = useSelector(selectCurrentToken);

    const { data: post, isSuccess, isLoading } = useGetSinglePost(postId, accessToken);

    if (!isSuccess) {
        return null;
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <CustomContainer
            maxWidth="xl"
            sx={{
                padding: "25px",
            }}
        >
            <RenderedPost 
                title={post.title}
                content={post.content} 
            />
            <CommentSection postId={postId} />
            {/* <Box 
                    component="img"
                    src={post.postImg}
                    sx={{
                        float: "left",
                        marginRight: "15px",
                        borderRadius: "10px"
                    }}
                /> */}
        </CustomContainer>
    );
};

export default Post;