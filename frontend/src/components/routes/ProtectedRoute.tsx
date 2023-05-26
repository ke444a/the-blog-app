import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";

export const ProtectedRoute = () => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}; 
