import React, { useState, useEffect } from 'react';
import { MutateOptions } from "react-query";
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { OutputItem } from '@hedgehog/core'
import Axios from "axios";

type AlertType = 'success' | 'error' | 'info'

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface DownloadSnackbarProps {
  setSource: React.Dispatch<React.SetStateAction<string>>;
  setResult: React.Dispatch<React.SetStateAction<{outputItem: OutputItem[], outputString: string}>>;
  complie: (variables: string, options?: (MutateOptions<React.SetStateAction<{outputItem: OutputItem[], outputString: string}>, string, Error, unknown> | undefined)) => Promise<React.SetStateAction<{outputItem: OutputItem[], outputString: string}>>;
  autoRun: boolean;
  yourUrl: string;
}

export interface SnackbarMessage {
  message: string;
  key: number;
}

export interface State {
  open: boolean;
  snackPack: SnackbarMessage[];
  messageInfo?: SnackbarMessage;
}

const DownloadSnackbar: React.FC<DownloadSnackbarProps> = (props: DownloadSnackbarProps) => {

  const { setResult, autoRun, complie, setSource, yourUrl} = props

  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined);
  const [alertType, setAlertType] = useState<AlertType>('info')

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  useEffect(() => {
    const getUrlData = async () => {
      try {
        const result = await Axios.get(decodeURIComponent(yourUrl))
        setSource(result.data)
        setSnackPack((prev) => [...prev, { message: "Download your script success", key: new Date().getTime() }]);
        setAlertType('success')
        if (autoRun) {
          setResult({
            outputItem: [],
            outputString: '',
          })
          complie(result.data)
        }
      } catch (e) {
        setSnackPack((prev) => [...prev, { message: "sorry, download your script failed", key: new Date().getTime() }]);
        setAlertType('error')
      }
    }
    setSnackPack((prev) => [...prev, { message: "Downloading your script, please don't click the 'Compile and run' button or select tutorial", key: new Date().getTime() }]);
    setAlertType('info')
    getUrlData()
  }, [complie, autoRun, setResult, setSource, yourUrl])

  const handleClose = (event: React.SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <div>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
      >
        <Alert onClose={handleClose} severity={alertType}>
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DownloadSnackbar
