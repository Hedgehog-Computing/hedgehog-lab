import React, { MouseEvent } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

interface DelButtonProps {
  name: string;
  getLocalCodeList: () => void;
}

const DelButton: React.FC<DelButtonProps> = (props: DelButtonProps) => {
  const [open, setOpen] = React.useState(false);

  const { name, getLocalCodeList } = props;

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
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClickOpen}>
        <DeleteIcon />
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
