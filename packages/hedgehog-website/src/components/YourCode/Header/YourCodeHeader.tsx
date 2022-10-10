import {Box} from "@mui/material";
import React from "react";
import SaveState from "../../Snippet/Save/SaveState";

const YourCodeHeader = (): React.ReactElement => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                justifyItems: "center"
            }}
        >
            <SaveState/>
        </Box>
    );
};

export default YourCodeHeader;
