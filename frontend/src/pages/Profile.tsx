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
import { PostContext } from "../context/PostContext";
import { useLogout } from "../hooks/auth/useLogout";
import { AppDispatch } from "../app/store";
import { logout } from "../features/auth/authSlice";
import { useRef, useState } from "react";
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

const Profile = () => {
    const userId: string = useLocation().pathname.split("/")[2];
    const accessToken = useSelector(selectCurrentToken);
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch<AppDispatch>();
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const editFormRef = useRef<HTMLFormElement | null>(null);
    const queryClient = useQueryClient();
    const [avatarImg, setAvatarImg] = useState<File | Blob | null>(null);
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

    const onEditSuccess = (data: IUser) => {
        dispatch(setCredentials({ user: data, accessToken }));
        queryClient.invalidateQueries(["users", "user"]);
        toast.success("User has been updated");
    };
    const updateUserMutation = useUpdateUser(user?._id || "", onEditSuccess);
    const handleProfileEdit = () => {
        if (isEditMode) {
            if (editFormRef.current) {
                const formData = new FormData(editFormRef.current);
                formData.append("fullName", formData.get("firstName") + " " + formData.get("lastName"));
                if (avatarImg) {
                    formData.delete("avatar");
                    formData.append("avatar", avatarImg);
                }
                updateUserMutation.mutate(formData);
            }
            setIsEditMode(false);
        } else {
            setIsEditMode(true);
        }
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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Paper
                    sx={{
                        padding: "25px 0",
                        width: "100%",
                        marginBottom: "20px",
                    }}
                    elevation={2}
                    square
                >
                    <CustomContainer
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        {!isEditMode && (
                            <Avatar
                                sx={(theme) => ({
                                    [theme.breakpoints.up("lg")]: {
                                        width: "200px",
                                        height: "200px",
                                        marginRight: "25px",
                                    },
                                    [theme.breakpoints.up("sm")]: {
                                        width: "120px",
                                        height: "120px",
                                    },
                                    borderRadius: "50%",
                                    width: "70px",
                                    height: "70px",
                                    marginRight: "15px",
                                })}
                                src={
                                    userInfoQuery.data?.avatar
                                        ? userInfoQuery.data.avatar
                                        : defaultAvatar
                                }
                                alt=""
                            />
                        )}
                        <Box
                            sx={{
                                display: isEditMode ? null : "flex",
                                justifyContent: isEditMode ? null : "space-between",
                                width: "100%",
                            }}
                        >
                            {isEditMode ? (
                                <EditUserForm
                                    user={user}
                                    ref={editFormRef}
                                    avatarImg={avatarImg}
                                    setAvatarImg={setAvatarImg}
                                />
                            ) : (
                                <Box>
                                    <Typography
                                        variant="h2"
                                        sx={(theme) => ({
                                            [theme.breakpoints.down("md")]: {
                                                fontSize: "1.5em",
                                            },
                                            [theme.breakpoints.down("sm")]: {
                                                fontSize: "1.1em",
                                            },
                                        })}
                                    >
                                        {userInfoQuery.data?.fullName}
                                    </Typography>
                                    <Typography
                                        variant="h3"
                                        sx={(theme) => ({
                                            opacity: 0.5,
                                            marginBottom: "10px",
                                            fontWeight: 500,
                                            fontSize: ".6em",

                                            [theme.breakpoints.up("md")]: {
                                                fontSize: ".9em",
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
                                            [theme.breakpoints.down("lg")]: {
                                                fontSize: "1em",
                                            },
                                            [theme.breakpoints.down("md")]: {
                                                fontSize: ".8em",
                                            },
                                        })}
                                    >
                                        {userInfoQuery.data?.bio}
                                    </Typography>
                                </Box>
                            )}
                            {user?._id === userId && (
                                <Stack spacing={1} sx={{ marginLeft: isEditMode ? 0 : 1, marginTop: isEditMode ? 1 : 0 }} direction={isEditMode ? "row" : "column"}>
                                    <Button
                                        size={isSmallScreen ? "small" : "medium"}
                                        color={isEditMode ? "success" : "info"}
                                        variant="outlined"
                                        sx={(theme) => ({
                                            fontWeight: 500,
                                            borderRadius: "10px",
                                            textTransform: "initial",
                                            [theme.breakpoints.down("sm")]: {
                                                fontSize: ".7em",
                                            },
                                        })}
                                        type="submit"
                                        onClick={handleProfileEdit}
                                    >
                                        {isEditMode ? "Save" : "Edit"}
                                    </Button>
                                    <Button
                                        size={isSmallScreen ? "small" : "medium"}
                                        color="error"
                                        variant="outlined"
                                        sx={(theme) => ({
                                            fontWeight: 500,
                                            borderRadius: "10px",
                                            textTransform: "initial",
                                            [theme.breakpoints.down("sm")]: {
                                                fontSize: ".7em",
                                            },
                                        })}
                                        onClick={() => logoutQuery.refetch()}
                                    >
                        Logout
                                    </Button>
                                </Stack>
                            )}
                        </Box>
                    </CustomContainer>
                </Paper>
                <CustomContainer>
                    <PostContext.Provider value="profile">
                        <AuthorPostList userProfileId={userInfoQuery.data?._id} />
                    </PostContext.Provider>
                </CustomContainer>
            </Box>
        );
    }

    return null;
};

export default Profile;