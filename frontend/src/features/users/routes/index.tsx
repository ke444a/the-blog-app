import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";

export const UserRoutes = () => {
    return (
        <Routes>
            <Route path=":userId" element={<Profile />} />
        </Routes>
    );
};
