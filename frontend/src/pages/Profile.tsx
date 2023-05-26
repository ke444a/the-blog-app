import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../features/auth/authSlice";
import CustomContainer from "../components/ui/CustomContainer";
import { PostContext } from "../context/PostContext";
import PostList from "../components/ui/PostList";
import { useLogout } from "../hooks/auth/useLogout";
import { AppDispatch } from "../app/store";
import { logout } from "../features/auth/authSlice";
import { useRef, useState } from "react";
import EditForm from "../components/form/EditForm";
import { setCredentials } from "../features/auth/authSlice";
import { useUpdateUser } from "../hooks/users/useUpdateUser";
import { useQueryClient } from "@tanstack/react-query";
import defaultAvatar from "../assets/profile.png";
import { useGetUser } from "../hooks/users/useGetUser";
import { Spinner } from "../components/ui/Spinner";
import { toast } from "react-toastify";

const Profile = () => {
    const userId: string = useLocation().pathname.split("/")[2];
    const accessToken = useSelector(selectCurrentToken);
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch<AppDispatch>();
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const editFormRef = useRef<HTMLFormElement | null>(null);
    const queryClient = useQueryClient();
    const [avatarImg, setAvatarImg] = useState<File | Blob | null>(null);

    const onEditSuccess = (data: User) => {
        dispatch(setCredentials({ user: data, accessToken }));
        queryClient.invalidateQueries(["users", "user"]);
        toast.success("User has been updated");
    };
    const updateUserMutation = useUpdateUser(user?._id || "", accessToken, onEditSuccess);
    const handleProfileEdit = () => {
        if (isEditMode) {
            if (editFormRef.current) {
                const formData = new FormData(editFormRef.current);
                formData.append("fullName", formData.get("firstName") + " " + formData.get("lastName"));
                if(avatarImg) {
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
        localStorage.removeItem("userId");
        dispatch(logout());
    };
    const logoutQuery = useLogout(onLogoutSuccess);

    const userInfoQuery = useGetUser(userId, accessToken);

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
                            flexDirection: "row"
                        }}
                    >
                        {!isEditMode && (
                            <Box
                                component="img"
                                sx={{
                                    width: "200px",
                                    height: "200px",
                                    borderRadius: "50%",
                                    marginRight: "25px",
                                }}
                                src={userInfoQuery.data?.avatar ? userInfoQuery.data.avatar : defaultAvatar}
                                alt=""
                            />
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%"
                            }}
                        >
                            { isEditMode ? 
                                <EditForm 
                                    user={user}
                                    accessToken={accessToken}
                                    ref={editFormRef}
                                    avatarImg={avatarImg}
                                    setAvatarImg={setAvatarImg}
                                />
                                :
                                <Box>
                                    <Typography variant="h2">
                                        {userInfoQuery.data?.fullName}
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            opacity: 0.5,
                                            marginBottom: "20px",
                                            fontSize: ".9em",
                                            fontWeight: 500,
                                        }}
                                    >
                  @{userInfoQuery.data?.username}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 500,
                                            width: "100%",
                                        }}
                                    >
                                        {userInfoQuery.data?.bio}
                                    </Typography>
                                </Box>
                            }
                            {user?._id === userId && (
                                <Stack spacing={1} sx={{ marginLeft: 1 }}>
                                    <Button
                                        size="medium"
                                        color={isEditMode ? "success" : "info"}
                                        variant="outlined"
                                        sx={{
                                            fontWeight: 500,
                                            borderRadius: "10px",
                                            textTransform: "initial",
                                        }}
                                        type="submit"
                                        onClick={handleProfileEdit}
                                    >
                                        {isEditMode ? "Save" : "Edit"}
                                    </Button>
                                    <Button
                                        size="medium"
                                        color="error"
                                        variant="outlined"
                                        sx={{
                                            fontWeight: 500,
                                            borderRadius: "10px",
                                            textTransform: "initial",
                                        }}
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
                    <Typography variant="h3" gutterBottom>
            Published Blogs
                    </Typography>
                    <PostContext.Provider value="profile">
                        <PostList 
                            userProfileId={userInfoQuery.data?._id}
                        />
                    </PostContext.Provider>
                </CustomContainer>
            </Box>
        );
    }

    return null;
};

export default Profile;