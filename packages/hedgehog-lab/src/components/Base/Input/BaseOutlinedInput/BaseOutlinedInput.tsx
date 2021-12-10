import {BaseTextFieldProps, InputAdornment, TextField} from "@mui/material";
import * as React from "react";
import toCapitalize from "../../../../utils/toCapitalize";
import {useFormContext} from "react-hook-form";

interface IBaseInputProps extends BaseTextFieldProps {
    name: string,
    adornment?: {
        start?: React.ReactNode,
        end?: React.ReactNode
    }
}

const BaseOutlinedInput: React.FC<IBaseInputProps> = (props) => {
    const {name, type, adornment} = props

    const useFormMethods = useFormContext()
    const errorMessage = useFormMethods.formState.errors?.[name]?.message

    return (
        <TextField
            variant={"outlined"}
            fullWidth
            type={type}
            placeholder={toCapitalize(name)}
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
