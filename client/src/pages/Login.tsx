import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
    Alert,
    Avatar,
    Button,
    LinearProgress,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import AxiosInstance from "../axios/axios";
import { useAppDispatch } from "../hooks/redux-hooks";
import { setAuth } from "../redux/auth/slice";

const Login = () => {
    const dispatch = useAppDispatch();
    const { mutate, isLoading, isError, error } = useMutation(
        async (loginInfo) => {
            let res = await AxiosInstance.post("/admin/login", loginInfo);
            dispatch(setAuth(res.data?.data));
            return res.data;
        }
    );

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required().label("Email"),
            password: Yup.string().required().label("Password"),
        }),
        onSubmit: (data) => mutate(data),
    });

    return (
        <Box
            display="flex"
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
            flexGrow={1}
            px={2}
        >
            <Paper style={{ overflow: "hidden" }}>
                {isLoading && <LinearProgress />}
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    px={5}
                    py={7}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        width="100%"
                        justifyContent="center"
                        alignItems="center"
                        mb={4}
                    >
                        <Avatar sx={{ mb: 2, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                    </Box>
                    {isError && (
                        <Alert severity="error">
                            {error.response.data.message}
                        </Alert>
                    )}
                    {/* <Alert severity="success">
                        This is a success alert — check it out!
                    </Alert> */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formik.values.email}
                        helperText={formik.touched.email && formik.errors.email}
                        error={formik.touched.email && !!formik.errors.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formik.values.password}
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                        error={
                            formik.touched.password && !!formik.errors.password
                        }
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                    />

                    <Button
                        disabled={isLoading}
                        type="submit"
                        fullWidth
                        size="large"
                        sx={{ mt: 2 }}
                        variant="contained"
                    >
                        Sign In
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
