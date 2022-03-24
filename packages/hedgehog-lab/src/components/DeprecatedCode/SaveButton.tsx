import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton, Tooltip} from "@mui/material";
import {SaveOutlined} from "@mui/icons-material";
import {useSnackbar} from "notistack";

interface SaveButtonProps {
    getLocalCodeList: () => void;
    source: string;
}

const SaveButton: React.FC<SaveButtonProps> = (props: SaveButtonProps) => {
    const {getLocalCodeList, source} = props;

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const {enqueueSnackbar} = useSnackbar()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError(false);
        setName('');
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const localNameList = JSON.parse(localStorage.getItem('localNameList') as string) as string[];
        if (localNameList.includes(e.target.value)) {
            setError(true);
        } else {
            setError(false);
        }
        setName(e.target.value);
    };

    const handleSave = () => {
        const localNameList = JSON.parse(localStorage.getItem('localNameList') as string) as string[];
        localNameList.push(name);
        localStorage.setItem('localNameList', JSON.stringify(localNameList));
        localStorage.setItem(name, source);
        getLocalCodeList();
        setOpen(false);
        setName('');

        enqueueSnackbar(`Saved ${name}`, {variant: 'success'})
    };

    return (
        <React.Fragment>
            <Tooltip arrow title={'Save'}>
                <label>
                    <IconButton onClick={handleClickOpen}>
                        <SaveOutlined/>
                    </IconButton>
                </label>
            </Tooltip>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Save Your Code</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        We will save your code in local,please don&apos;t use duplicate name.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Your Code Name"
                        type="text"
                        fullWidth
                        error={error}
                        helperText={"please don't use duplicate name."}
                        onChange={handleTextChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={error || !name} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default SaveButton;
