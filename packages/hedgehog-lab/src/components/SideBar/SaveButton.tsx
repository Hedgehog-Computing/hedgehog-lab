import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    save: {
      width: '50%',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: 'white',
    }
  })
);

interface SaveButtonProps {
  getLocalCodeList: () => void;
  source: string;
}

const SaveButton: React.FC<SaveButtonProps> = (props: SaveButtonProps) => {
  const { getLocalCodeList, source } = props;

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const classes = useStyles();

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
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        component="span"
        onClick={handleClickOpen}
        className={classes.save}>
        SAVE
      </Button>
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
