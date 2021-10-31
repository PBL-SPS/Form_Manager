import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Header() {
    const { isLoggedIn, logOutUser } = useAuth();
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {" "}
                        <Link
                            to="/"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            Form System
                        </Link>
                    </Typography>

                    {isLoggedIn ? (
                        <Button color="inherit" onClick={logOutUser}>
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit">
                            {" "}
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                Login{" "}
                            </Link>
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
