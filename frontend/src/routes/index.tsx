import { Routes, Route } from "react-router-dom";
import { AuthRoutes } from "../features/auth";
import { ProtectedRoute } from "./ProtectedRoute";
import { PostRoutes } from "../features/posts";
import { UserRoutes } from "../features/users";
import Home from "../features/misc/routes/Home";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth/*" element={<AuthRoutes />} />

            <Route path="/" element={<ProtectedRoute />}>
                <Route index element={<Home />} />
                <Route path="posts/*" element={<PostRoutes />} />
                <Route path="users/*" element={<UserRoutes />} />
            </Route>
        </Routes>
    );
};
