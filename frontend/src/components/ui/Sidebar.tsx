import { useLocation, NavLink, NavLinkProps } from "react-router-dom"; 
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CreateIcon from "@mui/icons-material/Create";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import profile from "../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../../features/auth/authSlice";
import { useState } from "react";
import Fade from "@mui/material/Fade";
import { useLogout } from "../../hooks/auth/useLogout";
import { AppDispatch } from "../../app/store";

interface SidebarLinkProps extends NavLinkProps {
    color?: string;
}

const SidebarLink = styled(NavLink)<SidebarLinkProps>((props) => ({
    marginBottom: "20px",
    padding: "10px",
    borderRadius: "20%",
    backgroundColor: props?.color ? props.color : "transparent",
    color: "inherit",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",

    "&:hover": {
        backgroundColor: !props?.color && "rgba(99, 99, 99, .3)"
    }
}));

const Sidebar = () => {
    const user: User = useSelector(selectCurrentUser);
    const location = useLocation();
    const [isLogoutOption, setIsLogoutOption] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const onLogoutSuccess = () => {
        localStorage.removeItem("userId");
        dispatch(logout());    
    };
    const logoutQuery = useLogout(onLogoutSuccess);

    return (
        <Paper
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                width: "100px",
                backgroundColor: "info.main",
                color: "secondary.main",
                borderRadius: "0px",
                padding: "20px 0",
            }}
            elevation={4}
        >
            <SidebarLink to="/home">
                <TwitterIcon sx={{ fontSize: 32 }} />
            </SidebarLink>
            <SidebarLink to="/home">
                {location.pathname === "/home" ? (
                    <HomeRoundedIcon sx={{ fontSize: 32 }} />
                ) : (
                    <HomeOutlinedIcon sx={{ fontSize: 32 }} />
                )}
            </SidebarLink>
            <SidebarLink to={`/profile/${user._id}`}>
                {location.pathname === `/profile/${user._id}` ? (
                    <PersonIcon sx={{ fontSize: 32 }} />
                ) : (
                    <PersonOutlineOutlinedIcon sx={{ fontSize: 32 }} />
                )}
            </SidebarLink>
            <SidebarLink to="/writing" color="#3066BE">
                <CreateIcon sx={{ fontSize: 32 }} />
            </SidebarLink>
            <Stack
                sx={{
                    marginTop: "auto",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                spacing={2}
            >
                <Fade in={isLogoutOption}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => logoutQuery.refetch()}
                        sx={{
                            textTransform: "initial",
                            position: "relative",

                            "::before": {
                                content: "\"\"",
                                width: 0,
                                height: 0,
                                position: "absolute",
                                borderLeft: "10px solid transparent",
                                borderRight: "10px solid transparent",
                                borderTop: "10px solid rgba(255, 253, 250, .7)",
                                left: "33px",
                                top: "40px",
                            },
                        }}
                    >
              Logout
                    </Button>
                </Fade>
                <Box
                    sx={{
                        backgroundColor: "transparent",
                        borderRadius: "20%",
                        padding: "10px",

                        "&:hover": {
                            backgroundColor: "rgba(99, 99, 99, .3)",
                        },
                    }}
                    onClick={() => setIsLogoutOption((prevOption) => !prevOption)}
                >
                    <Avatar
                        sx={{
                            width: 35,
                            height: 35,
                            marginTop: "auto",
                            cursor: "pointer",
                            transition: "background-color 0.2s ease-in-out",
                        }}
                        src={user.avatar ? user.avatar : profile}
                        alt=""
                    />
                </Box>
            </Stack>
        </Paper>
    );
};

export default Sidebar;