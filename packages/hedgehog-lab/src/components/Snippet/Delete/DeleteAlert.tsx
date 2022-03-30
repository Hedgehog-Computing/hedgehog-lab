import { Alert, Button } from "@mui/material";
import React from "react";

const DeleteAlert = (): React.ReactElement => {
  return (
    <Alert
      severity={"error"}
      variant={"filled"}
      action={
        <Button color="inherit" size="small">
          Yes
        </Button>
      }
    >
      Are you positive you want to delete this Snippet?
    </Alert>
  );
};

export default DeleteAlert;
