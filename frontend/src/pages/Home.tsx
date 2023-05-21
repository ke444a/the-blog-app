import Box from "@mui/material/Box";
import PostPreview from "../components/ui/PostPreview";
import CustomContainer from "../components/ui/CustomContainer";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../services/posts";
import { sortByDate } from "../utils/sortByDate";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { PostContext } from "../context/PostContext";

const Home = () => {
    const accessToken: string = useSelector(selectCurrentToken);

    const { data: posts, isSuccess } = useQuery({
        queryKey: ["posts"],
        queryFn: () => getAllPosts(accessToken),
    });          

    return (
        <PostContext.Provider value="homepage">
            <CustomContainer>
                <Box
                    sx={{
                        margin: "15px 0",
                        padding: "20px"
                    }}
                >
                    {
                        isSuccess && sortByDate(posts).map((post: Post) => (
                            <PostPreview
                                key={post._id}
                                id={post._id}
                                title={post.title}
                                content={post.content}
                                preview={post.preview}
                                createdAt={post.createdAt}
                                authorId={post.authorId}
                                updatedAt={post.updatedAt}
                                postImg={post.postImg}
                                likesNumber={post.likesNumber}
                                comments={post.comments}
                                accessToken={accessToken}
                            />
                        ))
                    }
                </Box>
            </CustomContainer>
        </PostContext.Provider>
    );
};

export default Home;