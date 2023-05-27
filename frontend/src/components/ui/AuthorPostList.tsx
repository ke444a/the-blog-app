import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useGetPostsByUser } from "../../hooks/posts/useGetPostsByUser";
import { sortByDate } from "../../utils/sortByDate";
import { Spinner } from "./Spinner";
import PostPreview from "./PostPreview";

const AuthorPostList = ({ userProfileId }: { userProfileId: string }) => {
    const accessToken = useSelector(selectCurrentToken);
    const authorPostsQuery = useGetPostsByUser(userProfileId, accessToken);
    if (!authorPostsQuery.isSuccess) {
        return null;
    }

    if (authorPostsQuery?.isLoading) {
        return <Spinner />;
    }

    return (
        <>
            {sortByDate(authorPostsQuery.data).map((post: Post) => (
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
                    userId={userProfileId}
                />
            ))}
        </>
    );
};

export default AuthorPostList;
