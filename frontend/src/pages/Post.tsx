import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import CustomContainer from "../components/ui/CustomContainer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGetSinglePost } from "../hooks/posts/useGetSinglePost";
import CommentSection from "../components/ui/CommentSection";
import RenderedPost from "../components/ui/RenderedPost";

const Post = () => {
    const postId: string = useLocation().pathname.split("/")[2];
    const accessToken: string = useSelector(selectCurrentToken);

    const { data: post, isSuccess } = useGetSinglePost(postId, accessToken);

    if (!isSuccess) {
        return null;
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