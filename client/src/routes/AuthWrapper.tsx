import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactNode, useEffect } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import AxiosInst from "../axios/axios";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import {
    logout,
    selectAuthState,
    selectTokens,
    setAuth,
} from "../redux/auth/slice";

const AuthWrapper = ({
    children,
    spinner = true,
}: {
    children: ReactNode;
    spinner?: Boolean | undefined;
}) => {
    const history = useHistory();
    const authState = useAppSelector(selectAuthState);
    const tokens = useAppSelector(selectTokens);
    const dispatch = useAppDispatch();

    const { isLoading, isError } = useQuery("user", async () => {
        if (authState !== "LOGGINGIN") return;
        const res = await AxiosInst.post<any, any>("/admin/refreshToken", {
            refreshToken: tokens.refreshToken,
        });
        const admin = await AxiosInst.get<any, any>("/admin/getAdminByToken", {
            headers: {
                authorization: "Bearer " + res.data.data.accessToken,
            },
        });
        dispatch(
            setAuth({
                ...res.data.data,
                user: admin.data.data,
                authState: "LOGGEDIN",
            })
        );
        return {
            ...res.data.data,
            user: admin.data.data,
        };
    });

    useEffect(() => {
        console.log(isError);
        if (isError) {
            dispatch(logout());
        }
        return () => {};
    }, [isError]);

    if ((authState === "LOGGINGIN" || isLoading) && spinner) {
        return (
            <Box
                flexGrow={1}
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <CircularProgress />
            </Box>
        );
    }
    return <>{children}</>;
};

export default AuthWrapper;
