import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { NavLink } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import { useLogout } from "../../hooks/auth/useLogout";
import defaultAvatar from "../../assets/profile.png";


const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch<AppDispatch>();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onLogoutSuccess = () => {
        localStorage.removeItem("userId");
        dispatch(logout());
    };
    const logoutQuery = useLogout(onLogoutSuccess);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <TwitterIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h2"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 3,
                            display: { xs: "none", md: "flex" },
                            letterSpacing: ".05rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
              Blog
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Box
                                    component={NavLink}
                                    to="/home"
                                    sx={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        textAlign: "center",
                                    }}
                                >
                    Feed
                                </Box>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Box
                                    component={NavLink}
                                    to={`/profile/${user?._id}`}
                                    textAlign="center"
                                    sx={{
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                    Profile
                                </Box>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Box
                                    component={NavLink}
                                    to="/editor"
                                    sx={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        textAlign: "center",
                                    }}
                                >
                    Editor
                                </Box>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <TwitterIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    <Typography
                        variant="h2"
                        noWrap
                        sx={{
                            mr: 3,
                            display: { xs: "flex", md: "none" },
                            letterSpacing: ".05rem",
                            color: "inherit",
                            textDecoration: "none",
                            flexGrow: 1,
                        }}
                    >
              Blog
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Box
                            component={NavLink}
                            to="/home"
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                mx: 1,
                                color: "inherit",
                                display: "block",
                                textDecoration: "none",
                                fontSize: "1rem",
                            }}
                        >
                FEED
                        </Box>
                        <Box
                            component={NavLink}
                            to={`/profile/${user?._id}`}
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                mx: 1,
                                color: "inherit",
                                display: "block",
                                textDecoration: "none",
                                fontSize: "1rem",
                            }}
                        >
                PROFILE
                        </Box>
                        <Box
                            component={NavLink}
                            to="/editor"
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                mx: 1,
                                color: "inherit",
                                display: "block",
                                textDecoration: "none",
                                fontSize: "1rem",
                            }}
                        >
                EDITOR
                        </Box>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="" src={user?.avatar ? user.avatar : defaultAvatar} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography
                                    onClick={() => logoutQuery.refetch()}
                                    textAlign="center"
                                >
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
