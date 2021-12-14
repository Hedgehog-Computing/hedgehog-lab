import {DeleteForeverOutlined} from "@mui/icons-material";
import {Dialog, IconButton} from "@mui/material";
import React, {useCallback, useState} from "react";
import DeleteAlert from "./DeleteAlert";

const DeleteDialog = (): React.ReactElement => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

    const handleDeleteDialogOpen = useCallback(() => {
        setDeleteDialogOpen(!deleteDialogOpen)
    }, [deleteDialogOpen])

    return (
        <>
            <IconButton color={'error'} onClick={handleDeleteDialogOpen}>
                <DeleteForeverOutlined/>
            </IconButton>

            <Dialog open={deleteDialogOpen} fullWidth maxWidth={'sm'} onClose={handleDeleteDialogOpen}>
                <DeleteAlert/>
            </Dialog>
        </>
    )
}

export default DeleteDialog
