import Box from "@mui/material/Box";
import React from "react";

const DevModeAlert = () => {
    return (
        <Box textAlign={'center'} bgcolor={'#000'} color={'#fff'}>
            This site under the development mode, Your data will not be saved constantly.
        </Box>
    )
}

export default DevModeAlert;
