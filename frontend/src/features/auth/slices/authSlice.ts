import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

interface StateType {
    user: IUser | null;
}

const initialState: StateType = {
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: IUser }>) => {
            const { user } = action.payload;
            state.user = user;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
