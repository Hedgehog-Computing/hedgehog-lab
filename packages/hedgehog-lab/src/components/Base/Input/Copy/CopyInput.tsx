import React, {useCallback, useEffect} from "react";
import {IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import {CopyAllOutlined} from "@mui/icons-material";
import {useCopyToClipboard} from "react-use";
import {useSnackbar} from "notistack";

interface ICopyInputProps {
    url: string,
}

const CopyInput: React.FC<ICopyInputProps> = (props): React.ReactElement => {
    const {url} = props

    const {enqueueSnackbar} = useSnackbar()
    const [copyToClipboardState, copyToClipboard] = useCopyToClipboard();

    const handleCopy = useCallback(() => {
        copyToClipboard(url);
        const state = copyToClipboardState.error

        if (state !== undefined) {
            enqueueSnackbar(state.message, {
                variant: 'error'
            })
        } else {
            const snackBarMessage = url.length > 40 ? url.slice(0, 40) : url

            enqueueSnackbar(`Copied ${snackBarMessage}...`, {
                variant: 'success'
            })
        }
    }, [url, copyToClipboard, copyToClipboardState.error, enqueueSnackbar])

    useEffect(() => {
        handleCopy()
    }, [handleCopy])

    return (
        <OutlinedInput value={url}
                       size="small"
                       fullWidth
                       multiline
                       endAdornment={
                           <InputAdornment position={'end'}>
                               <IconButton onClick={handleCopy}>
                                   <CopyAllOutlined/>
                               </IconButton>
                           </InputAdornment>
                       }
        />
    )
}

export default CopyInput
