import { useGetAllPosts } from "../../hooks/posts/useGetAllPosts";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import PostPreview from "./PostPreview";
import { sortByDate } from "../../utils/sortByDate";
import { useContext } from "react";
import { PostContext } from "../../context/PostContext";
import { useGetPostsByUser } from "../../hooks/posts/useGetPostsByUser";

type PostListProps = {
    userId?: string;
}

const PostList = ({ userId = "" }: PostListProps) => {
    const context = useContext(PostContext);
    const accessToken: string = useSelector(selectCurrentToken);
    const postsQuery = (context === "homepage") ? useGetAllPosts(accessToken) : useGetPostsByUser(userId, accessToken);
    
    if (!postsQuery.isSuccess) {
        return null;
    }

    return (
        <>
            { sortByDate(postsQuery.data).map((post: Post) => (
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
            ))}
        </>
    );
};

export default PostList;
