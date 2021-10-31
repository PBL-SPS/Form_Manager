import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ContainerSpinner = () => {
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
};

export default ContainerSpinner;
