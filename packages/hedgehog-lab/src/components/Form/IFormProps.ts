import {ControllerRenderProps} from "react-hook-form/dist/types/controller";
import {BaseTextFieldProps} from "@mui/material";
import React from "react";

export interface IFormProps extends BaseTextFieldProps {
    name: string,
    field?: ControllerRenderProps,
    control?: any,
    error?: any,
    startAdornment?: React.ReactNode,
    endAdornment?: React.ReactNode,
}

