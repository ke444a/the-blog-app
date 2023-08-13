import Editor from "./Editor";
import Post from "./Post";
import { Route, Routes } from "react-router-dom";

export const PostRoutes = () => {
    return (
        <Routes>
            <Route path="/editor" element={<Editor />} />
            <Route path=":postId" element={<Post />} />
        </Routes>
    );
};
