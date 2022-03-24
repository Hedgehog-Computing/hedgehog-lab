import {BaseTextFieldProps, InputAdornment, TextField} from "@mui/material";
import * as React from "react";
import toCapitalize from "../../../../utils/toCapitalize";
import {ControllerRenderProps, useFormContext} from "react-hook-form";

interface IBaseInputProps extends BaseTextFieldProps {
    field: ControllerRenderProps,
    adornment?: {
        start?: React.ReactNode,
        end?: React.ReactNode
    }
}

const BaseOutlinedInput: React.FC<IBaseInputProps> = (props) => {
    const {type, adornment, field, placeholder} = props

    const useFormMethods = useFormContext()
    const errorMessage = useFormMethods.formState.errors?.[field?.name]?.message

    return (
        <TextField
            variant={"outlined"}
            fullWidth
            {...field}
            type={type}
            placeholder={placeholder ? placeholder : toCapitalize(field?.name ?? '')}
            error={!!errorMessage}
            helperText={errorMessage}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {adornment?.start}
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position={"end"}>
                        {adornment?.end}
                    </InputAdornment>
                )
            }}
        />
    )
}

export default BaseOutlinedInput
