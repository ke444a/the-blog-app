import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface StateType {
    user: User | null;
    token: string;
}

const initialState: StateType = {
    user: null,
    token: ""
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<UserStoreData>) => {
            const { accessToken, user } = action.payload;
            state.user = user;
            state.token = accessToken;
        },
        logout: (state) => {
            state.user = null;
            state.token = "";
        }
    }
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
