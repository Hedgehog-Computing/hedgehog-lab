import {InputAdornment, TextField} from "@mui/material";
import * as React from "react";
import {IFormProps} from "../../Form/IFormProps";

const HOutlinedInput: React.FC<IFormProps> = (props) => {
    const {field, startAdornment, type, placeholder, endAdornment, error, helperText} = props

    return (
        <TextField
            variant={"outlined"}
            fullWidth
            {...field}
            type={type}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            inputProps={{
                startAdornment: (
                    <InputAdornment position={"start"}>
                        {startAdornment}
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position={"start"}>
                        {endAdornment}
                    </InputAdornment>
                )
            }}
        />
    )
}

export default HOutlinedInput
