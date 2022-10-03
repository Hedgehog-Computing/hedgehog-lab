import {Box, Skeleton} from "@mui/material";
import React from "react";

const EditorLoading = () => {
    return (
        <Box p={2}>
            {Array.from([1, 2, 3, 4, 5]).map((_, index) => (
                <Skeleton key={index} width={'100%'} height={'50px'}/>
            ))}
        </Box>
    )
}

export default EditorLoading
