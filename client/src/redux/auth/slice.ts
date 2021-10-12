import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../hooks/redux-hooks";
import { LS_KEYS } from "../../utils/constants";
import { RootState } from "../store";

// Define a type for the slice state
export interface AuthState {
    authState: "LOGGEDIN" | "LOGGINGIN" | "LOGGEDOUT";
    accessToken: string;
    refreshToken: string;
    user: User;
}
export interface User {
    id: string;
    first_name: string;
    last_name: string;
    contact: string;
    email: string;
}

// Define the initial state using that type
const initialState: AuthState = {
    authState:
        localStorage.getItem(LS_KEYS.IS_LOGGED_IN) === "1"
            ? "LOGGINGIN"
            : "LOGGEDOUT",
    accessToken: "",
    refreshToken: localStorage.getItem(LS_KEYS.TOKEN) || "",
    user: {
        id: "",
        first_name: "",
        last_name: "",
        contact: "",
        email: "",
    },
};

export const authSlice = createSlice({
    name: "auth",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
            localStorage.setItem(LS_KEYS.IS_LOGGED_IN, "1");
            localStorage.setItem(
                LS_KEYS.TOKEN,
                action.payload.refreshToken || ""
            );
            return { ...state, ...action.payload, authState: "LOGGEDIN" };
        },
        logout: (state) => {
            localStorage.removeItem(LS_KEYS.IS_LOGGED_IN);
            localStorage.removeItem(LS_KEYS.TOKEN);
            return { ...initialState, authState: "LOGGEDOUT" };
        },
    },
});

export const { setAuth, logout } = authSlice.actions;

export const selectTokens = (state: RootState) => ({
    refreshToken: state.auth.refreshToken,
    accessToken: state.auth.accessToken,
});

export const selectUser = (state: RootState) => state.auth.user;

export const selectAuthState = (state: RootState) => state.auth.authState;

export default authSlice.reducer;
