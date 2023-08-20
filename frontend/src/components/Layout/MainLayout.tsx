import { useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { globalStyles } from "../../assets/styles/globalStyles";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { selectCurrentUser } from "../../features/auth/slices/authSlice";
import { ReactNode } from "react";

export const MainLayout = (props: { children: ReactNode }) => {
    const user = useSelector(selectCurrentUser);
    const location = useLocation();
    const isShowNav =
        user &&
        location.pathname !== "/auth/login" &&
        location.pathname !== "/auth/register";

    return (
        <>
            <CssBaseline />
            {globalStyles}
            <ToastContainer
                limit={1}
                position="top-right"
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
                {isShowNav && <Navbar />}
                <Box sx={{ color: "primary.main" }}>{props.children}</Box>
                {isShowNav && <Footer />}
            </Box>
        </>
    );
};
