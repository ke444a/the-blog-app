import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { refreshToken } from "../../services/auth";
import { getUser } from "../../services/users";
import { store } from "../../app/store";
import { setCredentials } from "../../features/auth/authSlice";

export const PersistentLogin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                const newAccessToken = (await refreshToken())?.accessToken;
                const userId: string = (localStorage.getItem("userId") || "").replace(/"/g, "");
                const userInfo = await getUser(userId, newAccessToken);
                console.log(userInfo, newAccessToken);
                store.dispatch(setCredentials({ user: userInfo, accessToken: newAccessToken }));
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        
        !store.getState().auth.token ? verifyRefreshToken() : setIsLoading(false);
    }, []);

    return (
        <>
            {
                isLoading ?
                    <p> Loading... </p> :
                    <Outlet />
            }
        </>
    );
};
