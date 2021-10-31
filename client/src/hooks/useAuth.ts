import React from "react";
import {
    logout,
    selectAuthState,
    selectTokens,
    selectUser,
} from "../redux/auth/slice";
import { useAppDispatch, useAppSelector } from "./redux-hooks";

const useAuth = () => {
    const authState = useAppSelector(selectAuthState);
    const tokens = useAppSelector(selectTokens);
    const user = useAppSelector(selectUser);

    const dispatch = useAppDispatch();

    const isLoggedIn = authState === "LOGGEDIN";

    const logOutUser = () => {
        dispatch(logout());
    };
    return { isLoggedIn, tokens, user, logOutUser };
};

export default useAuth;
