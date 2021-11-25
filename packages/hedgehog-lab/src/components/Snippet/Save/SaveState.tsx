import {Alert, IconButton} from "@mui/material";
import {FiberManualRecord} from "@mui/icons-material";
import React from "react";
import {useRecoilValue} from "recoil";
import {codeSavingFlagState} from "../../YourCode/RYourCodeStates";

const SaveState = (): React.ReactElement => {
    const codeSavingFlag = useRecoilValue(codeSavingFlagState)

    return (
        <>
            {codeSavingFlag ? (
                <Alert variant={'filled'} severity={'info'}
                       action={
                           <IconButton
                               aria-label="close"
                               color="inherit"
                               size="small"
                           >
                               <FiberManualRecord fontSize="inherit"/>
                           </IconButton>
                       }>
                    File Name
                </Alert>
            ) : (
                <Alert variant={'filled'} severity={'success'}>
                    File Name
                </Alert>
            )}
        </>
    )
}

export default SaveState
