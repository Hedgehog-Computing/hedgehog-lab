import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Button,
    DialogContentText,
    Divider,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Snackbar,
    Toolbar,
    Typography
} from '@mui/material';
import {Theme} from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import withStyles from '@mui/styles/withStyles';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import {HEDGEHOG_DOMAIN} from "../../config"
import {CopyAllOutlined, InsertDriveFileOutlined, ShareOutlined} from "@mui/icons-material";
import {useCopyToClipboard} from "react-use";

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


interface ICopySnack {
    open?: boolean,
    message?: string
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    const {siderBarOpen, setOpen, lgBreakpointMatches, source} = props;

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [encodedUrlWithSourceCode, setEncodedUrlWithSoourceCode] = React.useState("");
    const [autoExecuteCheckboxStatus, setAutoExecuteCheckboxStatus] = React.useState(true);
    const [yourUrl, setYourUrl] = React.useState("");
    const [encodedYourUrl, setEncodedYourUrl] = React.useState("");

    const [copyToClipboardState, copyToClipboard] = useCopyToClipboard();

    const [copySnack, setCopySnack] = useState<ICopySnack>({
        open: false,
        message: ''
    })

    const classes = useStyles();

    const handleCopy = (url: string) => {
        copyToClipboard(url);
        const state = copyToClipboardState.error

        if (state !== undefined) {
            setCopySnack({open: true, message: state.message})
        }

        setCopySnack({open: true, message: 'Copied!'})
    }

    const handleCopySnackBarClose = () => {
        setCopySnack({open: false})
    }

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

                    <Dialog onClose={handleClose} aria-labelledby="Share your code via URL" open={dialogOpen}
                            fullWidth={true} maxWidth={"lg"}>
                        <MuiDialogTitle id="share-your-code">
                            Share your code via URL
                        </MuiDialogTitle>
                        <MuiDialogContent>
                            <Box>
                                <OutlinedInput id="outlined-basic" size="small" fullWidth
                                               multiline
                                               value={encodedUrlWithSourceCode}
                                               onFocus={handleFocus}
                                               endAdornment={
                                                   <InputAdornment position={'end'}>
                                                       <IconButton onClick={() => {
                                                           handleCopy(encodedUrlWithSourceCode)
                                                       }}>
                                                           <CopyAllOutlined/>
                                                       </IconButton>
                                                   </InputAdornment>
                                               }
                                />

                                <Snackbar autoHideDuration={2000} open={copySnack.open}
                                          onClose={handleCopySnackBarClose}
                                          message={copySnack.message}/>

                            </Box>


                            <Divider sx={{py: 2}}/>
                            <Box sx={{py: 2}}>


                                <DialogContentText>
                                    You can also generate a shareable URL with a Github or Github Gist script
                                    file (raw URL):
                                </DialogContentText>

                                <Box pt={1}>
                                    <TextField size={'small'} variant="outlined" fullWidth
                                               multiline label="Your Github or Github Gist raw URL"
                                               value={yourUrl}
                                               onChange={handleYourUrlTextAreaChange}
                                               sx={{mb: 2, mt: 1}}
                                    />

                                    <OutlinedInput size={'small'} fullWidth
                                                   multiline label="The generated shareable URL"
                                                   value={encodedYourUrl}
                                                   onFocus={handleFocus}
                                                   endAdornment={
                                                       <InputAdornment position={'end'}>
                                                           <IconButton onClick={() => {
                                                               handleCopy(encodedYourUrl)
                                                           }}>
                                                               <CopyAllOutlined/>
                                                           </IconButton>
                                                       </InputAdornment>
                                                   }
                                    />
                                </Box>
                            </Box>

                            <FormControlLabel
                                control={<Checkbox checked={autoExecuteCheckboxStatus} onChange={handleCheckboxChange}
                                                   name="checkedA"/>}
                                label="Automatically execute the script after loading"
                            />
                        </MuiDialogContent>
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
