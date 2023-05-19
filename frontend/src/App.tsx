import Grid from "@mui/material/Grid";
import Sidebar from "./components/ui/Sidebar";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Writing from "./pages/Writing";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/auth/authSlice";
import { ProtectedRoute } from "./components/features/ProtectedRoute";
import { selectCurrentToken } from "./features/auth/authSlice";
import { PersistentLogin } from "./components/features/PersistentLogin";

const App = () => {
    const token: string = useSelector(selectCurrentToken);
    const user: User = useSelector(selectCurrentUser);

    return (
        <>
            <CssBaseline />
            <Grid container>
                {token && (
                    <Grid item xs={1}>
                        <Sidebar />
                    </Grid>
                )}
                <Grid item xs>
                    <Routes>
                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route element={<PersistentLogin />}>
                            <Route element={<ProtectedRoute />}>
                                <Route path="/home" element={<Home />} />
                                <Route
                                    path="/profile/:username"
                                    element={
                                        <Profile
                                            username={user?.username}
                                            bio={user?.bio}
                                            fullName={user?.fullName}
                                            profileImg="https://picsum.photos/250"
                                        />
                                    }
                                />
                                <Route path="/writing" element={<Writing />} />
                            </Route>
                        </Route>

                    </Routes>
                </Grid>
            </Grid>
        </>
    );
};

export default App;
