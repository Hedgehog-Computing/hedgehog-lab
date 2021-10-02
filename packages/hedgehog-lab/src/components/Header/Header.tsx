import React, {useEffect} from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from '@mui/material';
import {Theme} from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import {WithStyles} from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import {HEDGEHOG_DOMAIN} from "../../config"
import {InsertDriveFileOutlined, ShareOutlined} from "@mui/icons-material";

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
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                    size="large">
                    <CloseIcon/>
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

const encodingShareableUrlWithSourceCode = (rawSourceString: string, autoRun: boolean): string => {
    const hedgehogLabDomain = HEDGEHOG_DOMAIN;
    const encodedSourceCode = encodeURIComponent(rawSourceString);
    const combinedFullshareableUrl = hedgehogLabDomain + "?code=" + encodedSourceCode
        + (autoRun ? "&auto_run=true" : "");
    return combinedFullshareableUrl;
}

const encodingShareableUrlWithURL = (yourUrl: string, autoRun: boolean): string => {
    const hedgehogLabDomain = HEDGEHOG_DOMAIN;
    const encodedURL = encodeURIComponent(yourUrl);
    const combinedFullshareableUrl = hedgehogLabDomain + "?your_url=" + encodedURL
        + (autoRun ? "&auto_run=true" : "");
    return combinedFullshareableUrl;
}


const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    const {siderBarOpen, setOpen, lgBreakpointMatches, source} = props;

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [encodedUrlWithSourceCode, setEncodedUrlWithSoourceCode] = React.useState("");
    const [autoExecuteCheckboxStatus, setAutoExecuteCheckboxStatus] = React.useState(true);
    const [yourUrl, setYourUrl] = React.useState("");
    const [encodedYourUrl, setEncodedYourUrl] = React.useState("");

    const classes = useStyles();

    const handleSideBarOpen = () => {
        setOpen(!siderBarOpen);
    };
    const handleClickOpen = () => {
        setDialogOpen(true);
    };
    const handleClose = () => {
        setDialogOpen(false);
    };
    const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        if ((event)) event.target.select();
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAutoExecuteCheckboxStatus(event.target.checked);
        setEncodedUrlWithSoourceCode(encodingShareableUrlWithSourceCode(source, event.target.checked));
    };

    const handleYourUrlTextAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYourUrl(event.target.value);
    }

    const cardClasses = cardStyles();

    useEffect(() => {
        if (source.length > 0) {
            setEncodedUrlWithSoourceCode(encodingShareableUrlWithSourceCode(source, autoExecuteCheckboxStatus));
        }
        if (yourUrl.length > 0) {
            setEncodedYourUrl(encodingShareableUrlWithURL(yourUrl, autoExecuteCheckboxStatus));
        }
    }, [source, autoExecuteCheckboxStatus, yourUrl]);

    return (
        <div>
            <AppBar position="fixed" elevation={0} color="transparent" className={classes.appBar}>
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        style={{display: 'inline'}}
                        onClick={handleSideBarOpen}
                        size="large">
                        {siderBarOpen ? (
                            <ArrowBackOutlinedIcon style={{fontSize: '1.25rem'}}/>
                        ) : (
                            // <img
                            //   src={process.env.PUBLIC_URL + '/cat.png'}
                            //   style={{ height: '1.25rem' }}
                            //   alt="Hedgehog Lab Logo"
                            // />
                            <MenuIcon style={{fontSize: '1.25rem'}}/>
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

                    <Button onClick={handleClickOpen} variant={'outlined'} size="small" startIcon={<ShareOutlined/>}>
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
                                        <TextField id="outlined-basic" size="small" variant="outlined" fullWidth
                                                   multiline
                                                   value={encodedUrlWithSourceCode}
                                                   onFocus={handleFocus}
                                        />
                                    </CardContent>
                                </Card>
                            </Box>
                            <Box p={1}>
                                <Card className={cardClasses.root}>
                                    <CardContent>
                                        <Typography gutterBottom>
                                            You can also generate a shareable URL with a Github or Github Gist script
                                            file (raw URL):
                                        </Typography>
                                        <Box p={1}>
                                            <TextField id="outlined-basic-2" size="small" variant="outlined" fullWidth
                                                       multiline label="Your Github or Github Gist raw URL"
                                                       value={yourUrl}
                                                       onChange={handleYourUrlTextAreaChange}
                                                //onFocus = {handleFocus}
                                            />
                                        </Box>
                                        <Box p={1}>
                                            <TextField id="outlined-basic-2" size="small" variant="outlined" fullWidth
                                                       multiline label="The generated shareable URL"
                                                       value={encodedYourUrl}
                                                       onFocus={handleFocus}
                                            />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box>
                            <FormControlLabel
                                control={<Checkbox checked={autoExecuteCheckboxStatus} onChange={handleCheckboxChange}
                                                   name="checkedA"/>}
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
                        sx={{mx: '10px'}}
                        onClick={() => {
                            window.open('https://hedgehog-book.github.io');
                        }}
                        size="small"
                        variant={'outlined'}
                        startIcon={<InsertDriveFileOutlined/>}>
                        Docs
                    </Button>

                    <Button
                        color="inherit"
                        style={{textTransform: 'none', height: 36}}
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
