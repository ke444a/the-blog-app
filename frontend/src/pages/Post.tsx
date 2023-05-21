import { useLocation } from "react-router-dom";
import { getSinglePost } from "../services/posts";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import CustomContainer from "../components/ui/CustomContainer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReactMarkdown from "react-markdown";

const Post = () => {
    const postId: string = useLocation().pathname.split("/")[2];
    const accessToken: string = useSelector(selectCurrentToken);

    const { data: post, isSuccess } = useQuery({
        queryFn: () => getSinglePost(postId, accessToken),
        queryKey: ["posts", postId]
    });

    if (!isSuccess) {
        return null;
    }

    return (
        <CustomContainer 
            maxWidth="xl"
            sx={{
                padding: "25px"
            }}
        >            
            <Typography 
                variant="h1"
                sx={{
                    marginBottom: "15px"
                }}
            >
                {post.title}
            </Typography>
            <Box
                sx={{
                    // fontSize: "16px"
                }}
            >
                <Box 
                    component="img"
                    src={post.postImg}
                    sx={{
                        float: "left",
                        marginRight: "15px",
                        borderRadius: "10px"
                    }}
                />
                <ReactMarkdown>
                    {post.content}
                </ReactMarkdown>
            </Box>
        </CustomContainer>
    );
};

export default Post;