import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/slices/authSlice";
import { persistReducer, persistStore } from "redux-persist";

const combineReducer = combineReducers({ auth: authReducer });

const persistConfig = {
    key: "auth",
    storage,
};
const persistedReducer = persistReducer(persistConfig, combineReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
