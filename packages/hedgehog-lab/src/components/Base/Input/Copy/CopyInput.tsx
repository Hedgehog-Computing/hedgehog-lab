import React, {useCallback, useEffect, useState} from "react";
import {IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import {CheckOutlined, CopyAllOutlined} from "@mui/icons-material";
import {useCopyToClipboard} from "react-use";
import {useSnackbar} from "notistack";

interface ICopyInputProps {
    url: string,
}

const CopyInput: React.FC<ICopyInputProps> = (props): React.ReactElement => {
    const {url} = props

    const {enqueueSnackbar} = useSnackbar()
    const [copyToClipboardState, copyToClipboard] = useCopyToClipboard();
    const [copy, setCopy] = useState(false)

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

            setCopy(true)

            setTimeout(() => {
                setCopy(false)
            }, 1000)
        }
    }, [url, copyToClipboard, copyToClipboardState.error, enqueueSnackbar, setCopy])

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
                                   {copy ? <CheckOutlined/>
                                       : <CopyAllOutlined/>
                                   }
                               </IconButton>
                           </InputAdornment>
                       }
        />
    )
}

export default CopyInput
