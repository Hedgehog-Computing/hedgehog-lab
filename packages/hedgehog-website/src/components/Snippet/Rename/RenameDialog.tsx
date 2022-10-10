import {CheckCircleOutlined, CloseOutlined, DriveFileRenameOutline,} from "@mui/icons-material";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton,} from "@mui/material";
import React, {useCallback, useState} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import SnippetNameInput from "../../Base/Input/Snippet/Name/SnippetNameInput";
import {renameModal, renameRule} from "../../../models/snippet/renameModal";
import {ISnippetName} from "../../../interfaces/ISnippetName";

const RenameDialog = (): React.ReactElement => {
    const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false);

    const handleRenameDialogOpen = useCallback(() => {
        setRenameDialogOpen(!renameDialogOpen);
    }, [renameDialogOpen]);

    const useFormMethods = useForm<ISnippetName>({
        resolver: yupResolver(renameRule),
    });

    const onSubmit: SubmitHandler<ISnippetName> = useCallback((data) => {
        renameModal(data);
    }, []);

    return (
        <>
            <IconButton size="small" onClick={handleRenameDialogOpen}>
                <DriveFileRenameOutline/>
            </IconButton>

            <Dialog open={renameDialogOpen} fullWidth maxWidth={"sm"}>
                <DialogTitle>
                    Rename snippet
                    <IconButton
                        aria-label="close"
                        onClick={handleRenameDialogOpen}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseOutlined/>
                    </IconButton>
                </DialogTitle>
                <FormProvider {...useFormMethods}>
                    <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
                        <DialogContent>
                            <SnippetNameInput/>
                        </DialogContent>

                        <DialogActions>
                            <Button startIcon={<CheckCircleOutlined/>} type={"submit"}>
                                Rename
                            </Button>
                        </DialogActions>
                    </form>
                </FormProvider>
            </Dialog>
        </>
    );
};

export default RenameDialog;
