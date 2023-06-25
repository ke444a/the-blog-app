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
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { globalStyles } from "./styles/globalStyles";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";

const App = () => {
    const token: string = useSelector(selectCurrentToken);

    return (
        <>
            <CssBaseline />
            {globalStyles}
            <ToastContainer
                limit={1}
                position="top-center"
                autoClose={3000}
                theme="dark"
            />
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {token && <Navbar />}
                <Box sx={{ color: "primary.main" }}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Signup />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/" index element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/profile/:id" element={<Profile />} />
                            <Route path="/editor" element={<Editor />} />
                            <Route path="/post/:id" element={<Post />} />
                        </Route>
                    </Routes>
                </Box>
                <Footer />
            </Box>
        </>
    );
};

export default App;
