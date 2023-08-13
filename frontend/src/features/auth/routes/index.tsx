import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="register" element={<Signup />} />
            <Route path="login" element={<Login />} />
        </Routes>
    );
};
