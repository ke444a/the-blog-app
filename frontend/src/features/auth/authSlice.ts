import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, user } = action.payload;
            state.user = user;
            state.token = accessToken;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
