import React, { useState, useEffect } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { OutputItem } from "hedgehog-core-js";
import ky from "ky";

type AlertType = "success" | "error" | "info";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

interface DownloadSnackbarProps {
  setSource: React.Dispatch<React.SetStateAction<string>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setResult: React.Dispatch<
    React.SetStateAction<{ outputItem: OutputItem[]; outputString: string }>
  >;
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

const DownloadSnackbar: React.FC<DownloadSnackbarProps> = (
  props: DownloadSnackbarProps
) => {
  const { setResult, autoRun, setInput, setSource, yourUrl } = props;

  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  );
  const [alertType, setAlertType] = useState<AlertType>("info");

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
        const result = await ky.get(yourUrl).text();
        setSource(result);
        setSnackPack((prev) => [
          ...prev,
          {
            message: "Download your script success",
            key: new Date().getTime(),
          },
        ]);
        setAlertType("success");
        if (autoRun) {
          setResult({
            outputItem: [],
            outputString: "",
          });
          setInput(result);
        }
      } catch (e) {
        setSnackPack((prev) => [
          ...prev,
          {
            message: "Sorry, download your script failed",
            key: new Date().getTime(),
          },
        ]);
        setAlertType("error");
      }
    };
    setSnackPack((prev) => [
      ...prev,
      {
        message:
          "Downloading your script, please don't click the 'Compile and run' button or select tutorial",
        key: new Date().getTime(),
      },
    ]);
    setAlertType("info");
    getUrlData();
  }, [setInput, autoRun, setResult, setSource, yourUrl]);

  const handleClose = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
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
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionProps={{
          onExited: handleExited,
        }}
      >
        <Alert onClose={handleClose} severity={alertType}>
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DownloadSnackbar;
