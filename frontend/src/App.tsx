import Sidebar from "./components/ui/Sidebar";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Writing from "./pages/Writing";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { selectCurrentToken } from "./features/auth/authSlice";
import { PersistentLogin } from "./components/routes/PersistentLogin";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
    const token: string = useSelector(selectCurrentToken);

    return (
        <>
            <CssBaseline />
            <ToastContainer limit={1} />
            <Box>
                {token && <Sidebar />}
                <Box
                    sx={{
                        marginLeft: token ? "100px" : "0"
                    }}
                >
                    <Routes>
                        <Route
                            path="/login"
                            element={<Login />}
                        />
                        <Route
                            path="/register"
                            element={<Signup />}
                        />

                        <Route element={<PersistentLogin />}>
                            <Route element={<ProtectedRoute />}>
                                <Route path="/home" element={<Home />} />
                                <Route
                                    path="/profile/:id"
                                    element={<Profile />}
                                />
                                <Route path="/writing" element={<Writing />} />
                                <Route path="/post/:id" element={<Post />} />
                            </Route>
                        </Route>

                    </Routes>
                </Box>
            </Box>
        </>
    );
};

export default App;
