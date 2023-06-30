import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { NavLink } from "react-router-dom";
import CustomContainer from "./CustomContainer";


// const Navbar = () => {
//     const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
//     const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
//     const user = useSelector(selectCurrentUser);
//     const dispatch = useDispatch<AppDispatch>();

//     const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorElNav(event.currentTarget);
//     };
//     const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorElUser(event.currentTarget);
//     };

//     const handleCloseNavMenu = () => {
//         setAnchorElNav(null);
//     };

//     const handleCloseUserMenu = () => {
//         setAnchorElUser(null);
//     };

//     const onLogoutSuccess = () => {
//         dispatch(logout());
//     };
//     const logoutQuery = useLogout(onLogoutSuccess);

//     return (
//         <AppBar position="static">
//             <Container maxWidth="xl">
//                 <Toolbar disableGutters>
//                     <TwitterIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
//                     <Typography
//                         variant="h2"
//                         noWrap
//                         sx={{
//                             mr: 3,
//                             display: { xs: "none", md: "flex" },
//                             letterSpacing: ".05rem",
//                             color: "inherit",
//                             textDecoration: "none",
//                             padding: "5px 0",
//                         }}
//                     >
//               The Blog
//                     </Typography>

//                     <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//                         <IconButton
//                             size="large"
//                             aria-label="Account of current user"
//                             aria-haspopup="true"
//                             onClick={handleOpenNavMenu}
//                             color="inherit"
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                         <Menu
//                             anchorEl={anchorElNav}
//                             anchorOrigin={{
//                                 vertical: "bottom",
//                                 horizontal: "left",
//                             }}
//                             keepMounted
//                             transformOrigin={{
//                                 vertical: "top",
//                                 horizontal: "left",
//                             }}
//                             open={Boolean(anchorElNav)}
//                             onClose={handleCloseNavMenu}
//                             sx={{
//                                 display: { xs: "block", md: "none" },
//                             }}
//                         >
//                             <MenuItem onClick={handleCloseNavMenu}>
//                                 <Box
//                                     component={NavLink}
//                                     to="/home"
//                                     sx={{
//                                         textDecoration: "none",
//                                         color: "inherit",
//                                         textAlign: "center",
//                                     }}
//                                 >
//                     FEED
//                                 </Box>
//                             </MenuItem>
//                             <MenuItem onClick={handleCloseNavMenu}>
//                                 <Box
//                                     component={NavLink}
//                                     to={`/profile/${user?._id}`}
//                                     textAlign="center"
//                                     sx={{
//                                         textDecoration: "none",
//                                         color: "inherit",
//                                     }}
//                                 >
//                     PROFILE
//                                 </Box>
//                             </MenuItem>
//                             <MenuItem onClick={handleCloseNavMenu}>
//                                 <Box
//                                     component={NavLink}
//                                     to="/editor"
//                                     sx={{
//                                         textDecoration: "none",
//                                         color: "inherit",
//                                         textAlign: "center",
//                                     }}
//                                 >
//                     EDITOR
//                                 </Box>
//                             </MenuItem>
//                         </Menu>
//                     </Box>
//                     <TwitterIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
//                     <Typography
//                         variant="h2"
//                         noWrap
//                         sx={{
//                             mr: 3,
//                             display: { xs: "flex", md: "none" },
//                             letterSpacing: ".05rem",
//                             color: "inherit",
//                             textDecoration: "none",
//                             flexGrow: 1,
//                             padding: "5px 0",
//                         }}
//                     >
//               The Blog
//                     </Typography>
//                     <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//                         <Box
//                             component={NavLink}
//                             to="/home"
//                             onClick={handleCloseNavMenu}
//                             sx={{
//                                 my: 2,
//                                 mx: 1,
//                                 color: "inherit",
//                                 display: "block",
//                                 textDecoration: "none",
//                                 fontSize: "1rem",
//                             }}
//                         >
//                 FEED
//                         </Box>
//                         <Box
//                             component={NavLink}
//                             to={`/profile/${user?._id}`}
//                             onClick={handleCloseNavMenu}
//                             sx={{
//                                 my: 2,
//                                 mx: 1,
//                                 color: "inherit",
//                                 display: "block",
//                                 textDecoration: "none",
//                                 fontSize: "1rem",
//                             }}
//                         >
//                 PROFILE
//                         </Box>
//                         <Box
//                             component={NavLink}
//                             to="/editor"
//                             onClick={handleCloseNavMenu}
//                             sx={{
//                                 my: 2,
//                                 mx: 1,
//                                 color: "inherit",
//                                 display: "block",
//                                 textDecoration: "none",
//                                 fontSize: "1rem",
//                             }}
//                         >
//                 EDITOR
//                         </Box>
//                     </Box>

//                     <Box sx={{ flexGrow: 0 }}>
//                         <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                             <Avatar
//                                 alt="Avatar"
//                                 src={user?.avatar ? user.avatar : defaultAvatar}
//                             />
//                         </IconButton>
//                         <Menu
//                             sx={{ mt: "45px" }}
//                             anchorEl={anchorElUser}
//                             anchorOrigin={{
//                                 vertical: "top",
//                                 horizontal: "right",
//                             }}
//                             keepMounted
//                             transformOrigin={{
//                                 vertical: "top",
//                                 horizontal: "right",
//                             }}
//                             open={Boolean(anchorElUser)}
//                             onClose={handleCloseUserMenu}
//                         >
//                             <MenuItem onClick={handleCloseUserMenu}>
//                                 <Typography
//                                     onClick={() => logoutQuery.refetch()}
//                                     textAlign="center"
//                                 >
//                     Logout
//                                 </Typography>
//                             </MenuItem>
//                         </Menu>
//                     </Box>
//                 </Toolbar>
//             </Container>
//         </AppBar>
//     );
// };


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
                    to="/editor"
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
                    to={`/profile/${user?._id}`}
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
