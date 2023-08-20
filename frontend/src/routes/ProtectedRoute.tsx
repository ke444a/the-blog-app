import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/slices/authSlice";

export const ProtectedRoute = () => {
    const user = useSelector(selectCurrentUser);
    const location = useLocation();

    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/auth/login" state={{ from: location }} />
    );
};
