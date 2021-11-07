import React, {MouseEvent} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton} from '@mui/material';
import {DeleteForeverOutlined} from "@mui/icons-material";

interface DelButtonProps {
    name: string;
    getLocalCodeList: () => void;
}

const DelButton: React.FC<DelButtonProps> = (props: DelButtonProps) => {
    const [open, setOpen] = React.useState(false);

    const {name, getLocalCodeList} = props;

    const handleClickOpen = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setOpen(true);
    };

    const handleClose = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setOpen(false);
    };

    const handleDelete = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        const localNameList = JSON.parse(localStorage.getItem('localNameList') as string) as string[];
        const newLocalNameList = localNameList.filter((item) => item !== name);
        localStorage.setItem('localNameList', JSON.stringify(newLocalNameList));
        localStorage.removeItem(name);
        getLocalCodeList();
        setOpen(false);
    };

    return (
        <React.Fragment>
            <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleClickOpen}
                size="small">
                <DeleteForeverOutlined/>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{`Are you really want delete '${name}'`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you click Delete button, You will not be able to retrieve &apos;{name}&apos;.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Don&apos;t delete
                    </Button>
                    <Button onClick={handleDelete} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default DelButton;
