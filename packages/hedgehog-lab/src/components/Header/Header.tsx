import React, {useEffect} from 'react';
import {
    AppBar,
    Button,
    DialogContentText,
    Divider,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Toolbar,
    Typography
} from '@mui/material';
import {Theme} from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
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
import {CopyAllOutlined, InsertDriveFileOutlined, MenuOutlined, ShareOutlined} from "@mui/icons-material";
import {useCopyToClipboard} from "react-use";
import {useSnackbar} from "notistack";

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

    const {enqueueSnackbar} = useSnackbar()

    const classes = useStyles();

    const handleCopy = (url: string) => {
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
        }
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
            <AppBar position="fixed" elevation={0} color="transparent" className={classes.appBar}
                    sx={{width: siderBarOpen ? 'calc(100vw - 230px)' : '100%'}}>
                <Toolbar variant="dense">
                    {!siderBarOpen &&
                    <>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            style={{display: 'inline'}}
                            onClick={handleSideBarOpen}
                            size="large">
                            <MenuOutlined style={{fontSize: '1.25rem'}}/>
                        </IconButton>

                        {lgBreakpointMatches &&
                        <Typography
                            variant={'h6'}
                            sx={{
                                fontWeight: 600,
                                letterSpacing: 0,
                                width: '100%'
                            }}
                        >
                            Hedgehog Lab
                        </Typography>}
                    </>
                    }

                    <Box display={'flex'} justifyContent={'end'} width={'100%'}>
                        <Button onClick={handleClickOpen} variant={'outlined'} size="small"
                                startIcon={<ShareOutlined/>}>
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
                                                       multiline
                                                       value={yourUrl && encodedYourUrl}
                                                       onFocus={handleFocus}
                                                       endAdornment={
                                                           <InputAdornment position={'end'}>
                                                               <IconButton disabled={!yourUrl} onClick={() => {
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
                                    control={<Checkbox checked={autoExecuteCheckboxStatus}
                                                       onChange={handleCheckboxChange}
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
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
