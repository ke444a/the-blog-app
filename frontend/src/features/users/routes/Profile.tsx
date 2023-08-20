import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { selectCurrentUser } from "../../auth/slices/authSlice";
import { CustomContainer } from "../../../components/Layout/CustomContainer";
import { useLogoutQuery } from "../../auth";
import { useState } from "react";
import { EditUserForm } from "../components/EditUserForm";
import defaultAvatar from "../../../assets/images/default_avatar.webp";
import { useGetUserQuery } from "../api/getUser";
import { Spinner } from "../../../components/Elements/Spinner";
import AuthorPostList from "../../posts/components/AuthorPostList";
import { useMediaQuery, Theme } from "@mui/material";
import RssFeedIcon from "@mui/icons-material/RssFeed";

const Profile = () => {
    const { userId } = useParams();
    const user = useSelector(selectCurrentUser);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const isLargeScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.up("xl"),
    );
    const { refetch: logout } = useLogoutQuery();
    const {
        data: userProfile,
        isLoading: isLoadingUser,
        isSuccess: isUserLoaded,
    } = useGetUserQuery(userId || "");

    if (isLoadingUser) {
        return <Spinner />;
    }

    if (!isUserLoaded) {
        return null;
    }

    return (
        <CustomContainer
            sx={{
                display: { sm: "flex" },
                pt: 3,
                mb: 4,
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
                            userProfile?.avatar
                                ? (userProfile.avatar as string)
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
                            setIsEditMode={setIsEditMode}
                            user={userProfile}
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
                                {userProfile?.fullName}
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
                                @{userProfile?.username}
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
                                {userProfile?.bio}
                            </Typography>
                        </Box>
                    )}
                    {user?.id === userId && !isEditMode && (
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
                                onClick={() =>
                                    setIsEditMode(
                                        (prevEditMode) => !prevEditMode,
                                    )
                                }
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
                                onClick={() => logout()}
                            >
                                Logout
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Paper>
            <Box
                sx={{
                    flexGrow: 1,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 3,
                    }}
                >
                    <RssFeedIcon
                        fontSize={isLargeScreen ? "large" : "medium"}
                    />
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: "600",
                        }}
                    >
                        Recently posted
                    </Typography>
                </Box>
                <AuthorPostList userProfileId={userProfile?.id || ""} />
            </Box>
        </CustomContainer>
    );
};

export default Profile;
