import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Post from "../components/ui/Post";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../services/posts";
import { sortByDate } from "../utils/sortByDate";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

const Home = () => {
    const accessToken: string = useSelector(selectCurrentToken);

    const { data: posts, isSuccess } = useQuery({
        queryKey: ["posts"],
        queryFn: () => getAllPosts(accessToken),
    });          

    return (
        <Container maxWidth="xl">
            <Box
                color="primary.main"
                sx={{
                    margin: "15px 0",
                }}
            >
                {
                    isSuccess && sortByDate(posts).map((post: Post) => (
                        <Post
                            key={post._id}
                            id={post._id}
                            accessToken={accessToken}
                            title={post.title}
                            content={post.content}
                            preview={post.preview}
                            createdAt={post.createdAt}
                            authorId={post.authorId}
                            updatedAt={post.updatedAt}
                            postImg={post.postImg}
                            likesNumber={post.likesNumber}
                            comments={post.comments}
                        />
                    ))
                }
            </Box>
        </Container>
    );
};

export default Home;