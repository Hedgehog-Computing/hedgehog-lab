import React from 'react';
import { AppBar, Button, Toolbar, Typography, IconButton } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import ShareIcon from '@material-ui/icons/Share';
import { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import InsertDriveFileRoundedIcon from '@material-ui/icons/InsertDriveFileRounded';

interface HeaderProps {
  siderBarOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lgBreakpointMatches: boolean;
  source: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      borderBottom: '1px solid #E0E0E0'
    }
  })
);

const dialogStyles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const cardStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface DialogTitleProps extends WithStyles<typeof dialogStyles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(dialogStyles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const encodingShareableUrlWithSourceCode = (rawSourceString:string, autoRun:boolean):string=>{
  const hedgehogLabDomain = "https://hedgehog-lab.github.io/"
  const encodedSourceCode = encodeURIComponent(rawSourceString);
  const combinedFullshareableUrl = hedgehogLabDomain + "?code=" + encodedSourceCode 
      + (autoRun? "&auto_run=true":"");
  return combinedFullshareableUrl;
}

const encodingShareableUrlWithURL = (yourUrl:string, autoRun:boolean):string=>{
  const hedgehogLabDomain = "https://hedgehog-lab.github.io/"
  const encodedURL = encodeURIComponent(yourUrl);
  const combinedFullshareableUrl = hedgehogLabDomain + "?your_url=" + encodedURL 
      + (autoRun? "&auto_run=true":"");
  return combinedFullshareableUrl;
}


const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { siderBarOpen, setOpen, lgBreakpointMatches, source } = props;

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [encodedUrlWithSourceCode, setEncodedUrlWithSoourceCode] = React.useState("");
  const [autoExecuteCheckboxStatus, setAutoExecuteCheckboxStatus] = React.useState(true);
  const [yourUrl, setYourUrl] = React.useState("");
  const [encodedYourUrl, setEncodedYourUrl] = React.useState("");

  const classes = useStyles();

  const handleSideBarOpen = () => {setOpen(!siderBarOpen);};
  const handleClickOpen = () => {setDialogOpen(true);};
  const handleClose = () => {setDialogOpen(false);};
  const handleFocus =(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {if ((event)) event.target.select();}

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutoExecuteCheckboxStatus(event.target.checked);
    setEncodedUrlWithSoourceCode(encodingShareableUrlWithSourceCode(source, event.target.checked));
  };

  const handleYourUrlTextAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYourUrl(event.target.value);
  }

  const cardClasses = cardStyles();

  useEffect(()=>{
    if (source.length>0){
      setEncodedUrlWithSoourceCode(encodingShareableUrlWithSourceCode(source, autoExecuteCheckboxStatus));
    }
    if (yourUrl.length>0){
      setEncodedYourUrl(encodingShareableUrlWithURL(yourUrl,autoExecuteCheckboxStatus));
    }
  },[source, autoExecuteCheckboxStatus, yourUrl]);
        
  return (
    <div>
      <AppBar position="fixed" elevation={0} color="transparent" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ display: 'inline' }}
            onClick={handleSideBarOpen}>
            {siderBarOpen ? (
              <ArrowBackOutlinedIcon style={{ fontSize: '1.25rem' }} />
            ) : (
              // <img
              //   src={process.env.PUBLIC_URL + '/cat.png'}
              //   style={{ height: '1.25rem' }}
              //   alt="Hedgehog Lab Logo"
              // />
              <MenuIcon style={{ fontSize: '1.25rem' }} />
            )}
          </IconButton>

          <Typography
            variant={lgBreakpointMatches ? 'h6' : 'body1'}
            style={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center'
            }}>
            Hedgehog Lab
          </Typography>

          <Button
            onClick={handleClickOpen}
            color="default"
            size="small"
            startIcon={<ShareIcon />}
          >
            Share
          </Button>

          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={dialogOpen}
          fullWidth={true} maxWidth={"lg"}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Share your code via URL
            </DialogTitle>
            <DialogContent dividers>
              <Box p={1}>
                <Card className={cardClasses.root}>
                  <CardContent>
                    <Typography gutterBottom>
                      Share your current script with the link below:
                    </Typography>
                    <TextField id="outlined-basic"  size="small" variant="outlined" fullWidth multiline 
                      value = {encodedUrlWithSourceCode}
                      onFocus = {handleFocus}
                    />
                  </CardContent>
                </Card>
              </Box>
              <Box p={1}>
                <Card className={cardClasses.root}>
                  <CardContent>
                    <Typography gutterBottom>
                      You can also generate a shareable URL with a Github or Github Gist script file (raw URL):
                    </Typography>
                    <Box p={1}>
                      <TextField id="outlined-basic-2"  size="small" variant="outlined" fullWidth multiline label = "Your Github or Github Gist raw URL"
                        value = {yourUrl}
                        onChange = {handleYourUrlTextAreaChange}
                        //onFocus = {handleFocus}
                      />
                    </Box>
                    <Box p={1}>
                      <TextField id="outlined-basic-2"  size="small" variant="outlined" fullWidth multiline label = "The generated shareable URL"
                        value = {encodedYourUrl}
                        onFocus = {handleFocus}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <FormControlLabel
                control={<Checkbox checked={autoExecuteCheckboxStatus} onChange={handleCheckboxChange} name="checkedA" />}
                label="Automatically execute the script after loading"
              />
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                Done
              </Button>
            </DialogActions>
          </Dialog>

          <Button
            onClick={() => {
              window.open('https://hedgehog-book.github.io');
            }}
            color="default"
            size="small"
            startIcon={<InsertDriveFileRoundedIcon />}
          >
            Docs
          </Button>

          <Button
            color="inherit"
            style={{ textTransform: 'none', height: 36 }}
            onClick={() => {
              window.open('https://github.com/hedgehog-computing/hedgehog-lab');
            }}>
            <img
              alt="GitHub stars"
              src="https://img.shields.io/github/stars/hedgehog-computing/hedgehog-lab?style=social"
            />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
