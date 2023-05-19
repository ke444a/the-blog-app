import { useLocation, NavLink, NavLinkProps } from "react-router-dom"; 
import Paper from "@mui/material/Paper";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CreateIcon from "@mui/icons-material/Create";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/system";
import profile from "../../assets/profile.png";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";

interface SidebarLinkProps extends NavLinkProps {
    color?: string;
}

const SidebarLink = styled(NavLink)<SidebarLinkProps>`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 20%;
  background-color: ${(props) => (props?.color ? props.color : "transparent")};
  color: inherit;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => !props?.color && "rgba(99, 99, 99, .3)"};
    transition: background-color 0.2s ease-in-out;
  }
`;

const Sidebar = () => {
    const user: User = useSelector(selectCurrentUser);
    const location = useLocation();

    return (
        <Paper
            sx={{
                position: "fixed",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                padding: "20px",
                backgroundColor: "info.main",
                color: "secondary.main",
                borderRadius: "0px",
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
            <SidebarLink to={`/profile/${user.username}`}>
                {location.pathname === `/profile/${user.username}` ? (
                    <PersonIcon sx={{ fontSize: 32 }} />
                ) : (
                    <PersonOutlineOutlinedIcon sx={{ fontSize: 32 }} />
                )}
            </SidebarLink>
            <SidebarLink to="/writing" color="#3066BE">
                <CreateIcon sx={{ fontSize: 32 }} />
            </SidebarLink>
            <Avatar 
                sx={{ 
                    width: 42, 
                    height: 42, 
                    marginTop: "auto", 
                    cursor: "pointer" 
                }} 
                src={profile}
                alt=""
            />
        </Paper>
    );
};

export default Sidebar;