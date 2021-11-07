import {ControllerRenderProps} from "react-hook-form/dist/types/controller";
import {InputBaseProps} from "@mui/material";

export interface IFormProps extends InputBaseProps {
    field?: ControllerRenderProps,
    control?: any
}
