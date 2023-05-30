import Sidebar from "./components/ui/Sidebar";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Editor from "./pages/Editor";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { selectCurrentToken } from "./features/auth/authSlice";
import { PersistentLogin } from "./components/routes/PersistentLogin";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { globalStyles } from "./styles/globalStyles";
import Navbar from "./components/ui/Navbar";

const App = () => {
    const token: string = useSelector(selectCurrentToken);

    return (
        <>
            <CssBaseline />
            {globalStyles}
            <ToastContainer limit={1} />
            {token && <Navbar />}
            <Box>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Signup />} />

                    <Route element={<PersistentLogin />}>
                        <Route element={<ProtectedRoute />}>
                            <Route path="/home" element={<Home />} />
                            <Route path="/profile/:id" element={<Profile />} />
                            <Route path="/editor" element={<Editor />} />
                            <Route path="/post/:id" element={<Post />} />
                        </Route>
                    </Route>
                </Routes>
            </Box>
        </>
    );
};

export default App;
