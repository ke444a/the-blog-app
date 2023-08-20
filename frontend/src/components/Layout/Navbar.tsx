import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/slices/authSlice";
import { NavLink } from "react-router-dom";
import { CustomContainer } from "./CustomContainer";

const Navbar = () => {
    const user = useSelector(selectCurrentUser);

    return (
        <CustomContainer>
            <Box
                sx={(theme) => ({
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: theme.spacing(3, 0),
                    borderBottom: "1px solid rgba(0,0,0,0.34)",
                })}
            >
                <Box
                    component={NavLink}
                    to="/"
                    sx={{
                        mx: 2,
                        color: "inherit",
                        display: "block",
                        textDecoration: "none",
                    }}
                    fontSize="1.2em"
                >
                    Home
                </Box>
                <Box
                    component={NavLink}
                    to="/posts/editor"
                    sx={{
                        mx: 2,
                        color: "inherit",
                        display: "block",
                        textDecoration: "none",
                    }}
                    fontSize="1.2em"
                >
                    Editor
                </Box>
                <Box
                    component={NavLink}
                    to={`/users/${user?.id}`}
                    sx={{
                        mx: 2,
                        color: "inherit",
                        display: "block",
                        textDecoration: "none",
                    }}
                    fontSize="1.2em"
                >
                    Profile
                </Box>
            </Box>
        </CustomContainer>
    );
};

export default Navbar;
