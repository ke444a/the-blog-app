import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { selectCurrentToken, selectCurrentUser } from "../features/auth/authSlice";
import CustomContainer from "../components/ui/CustomContainer";
import { useLogout } from "../hooks/auth/useLogout";
import { AppDispatch } from "../app/store";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";
import { EditUserForm } from "../components/form/EditUserForm";
import { setCredentials } from "../features/auth/authSlice";
import { useUpdateUser } from "../hooks/users/useUpdateUser";
import { useQueryClient } from "@tanstack/react-query";
import defaultAvatar from "../assets/default.webp";
import { useGetUser } from "../hooks/users/useGetUser";
import { Spinner } from "../components/ui/Spinner";
import { toast } from "react-toastify";
import AuthorPostList from "../components/ui/AuthorPostList";
import { useMediaQuery, Theme } from "@mui/material";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import { FieldValues } from "react-hook-form";

const Profile = () => {
    const userId: string = useLocation().pathname.split("/")[2];
    const accessToken = useSelector(selectCurrentToken);
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch<AppDispatch>();
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const [avatarImg, setAvatarImg] = useState<File | Blob | null>(null);
    const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up("xl"));

    const onEditSuccess = (data: IUser) => {
        dispatch(setCredentials({ user: data, accessToken }));
        queryClient.invalidateQueries(["users", "user"]);
        toast.success("User has been updated");
    };
    const updateUserMutation = useUpdateUser(user?._id || "", onEditSuccess);

    const handleProfileEdit = (userData: FieldValues) => {
        const formData = new FormData();
        formData.append("username", userData.username);
        formData.append("fullName", userData.firstName + " " + userData.lastName);
        if (avatarImg) {
            console.log(avatarImg);
            formData.append("avatar", avatarImg);
        }
        if (userData.bio) {
            formData.append("bio", userData.bio);
        }
        updateUserMutation.mutate(formData);
        setIsEditMode(false);
    };

    const onLogoutSuccess = () => {
        dispatch(logout());
    };
    const logoutQuery = useLogout(onLogoutSuccess);

    const userInfoQuery = useGetUser(userId);

    if (userInfoQuery.isLoading || updateUserMutation.isLoading) {
        return <Spinner />;
    }

    if (userInfoQuery.isSuccess) {
        return (
            <CustomContainer
                sx={{
                    display: { sm: "flex" },
                    pt: 3,
                    mb: 4
                }}
            >
                <Paper
                    sx={(theme) => ({
                        flex: { xs: "0 1 45%", md: "0 0 30%" },
                        marginRight: { xs: 0, sm: theme.spacing(4) },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: theme.spacing(2),
                        height: "fit-content",
                        marginBottom: { xs: theme.spacing(3), sm: 0 },
                    })}
                    elevation={2}
                >
                    {!isEditMode && (
                        <Avatar
                            sx={(theme) => ({
                                [theme.breakpoints.up("lg")]: {
                                    width: "220px",
                                    height: "220px",
                                },
                                [theme.breakpoints.up("sm")]: {
                                    width: "140px",
                                    height: "140px",
                                },
                                borderRadius: "50%",
                                width: "120px",
                                height: "120px",
                                marginBottom: theme.spacing(2),
                            })}
                            src={
                                userInfoQuery.data?.avatar
                                    ? userInfoQuery.data.avatar
                                    : defaultAvatar
                            }
                            alt="Profile image"
                        />
                    )}
                    <Box
                        sx={{
                            width: "100%",
                        }}
                    >
                        {isEditMode ? (
                            <EditUserForm
                                user={user}
                                avatarImg={avatarImg}
                                setAvatarImg={setAvatarImg}
                                handleProfileEdit={handleProfileEdit}
                            />
                        ) : (
                            <Box>
                                <Typography
                                    variant="h2"
                                    sx={(theme) => ({
                                        [theme.breakpoints.down("md")]: {
                                            fontSize: "1.6em",
                                        },
                                    })}
                                >
                                    {userInfoQuery.data?.fullName}
                                </Typography>
                                <Typography
                                    variant="h3"
                                    sx={(theme) => ({
                                        marginBottom: theme.spacing(2),
                                        fontWeight: 500,
                                        fontSize: ".9em",
                                        color: "secondary.main",

                                        [theme.breakpoints.up("md")]: {
                                            marginBottom: "20px",
                                        },
                                    })}
                                >
                      @{userInfoQuery.data?.username}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={(theme) => ({
                                        fontWeight: 500,
                                        width: "100%",
                                        fontSize: "1rem",
                                        marginBottom: theme.spacing(3),
                                    })}
                                >
                                    {userInfoQuery.data?.bio}
                                </Typography>
                            </Box>
                        )}
                        {user?._id === userId && !isEditMode && (
                            <Stack spacing={1} direction="row">
                                <Button
                                    size="medium"
                                    color="info"
                                    variant="text"
                                    sx={{
                                        fontWeight: 500,
                                        borderRadius: "10px",
                                        textTransform: "initial",
                                        width: "50%",
                                    }}
                                    type="submit"
                                    onClick={() => setIsEditMode(prevEditMode => !prevEditMode)}
                                >
                                    {isEditMode ? "Save" : "Edit"}
                                </Button>
                                <Button
                                    size="medium"
                                    color="error"
                                    variant="text"
                                    sx={{
                                        fontWeight: 500,
                                        borderRadius: "10px",
                                        textTransform: "initial",
                                        width: "50%",
                                    }}
                                    onClick={() => logoutQuery.refetch()}
                                >
                      Logout
                                </Button>
                            </Stack>
                        )}
                    </Box>
                </Paper>
                <Box sx={{
                    flexGrow: 1
                }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 3,
                        }}
                    >
                        <RssFeedIcon fontSize={isLargeScreen ? "large" : "medium"} />
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: "600",
                            }}
                        >
                  Recently posted
                        </Typography>
                    </Box>
                    <AuthorPostList userProfileId={userInfoQuery.data?._id} />
                </Box>
            </CustomContainer>
        );
    }

    return null;
};

export default Profile;