import {InputAdornment, OutlinedInput} from "@mui/material";
import * as React from "react";
import {IFormProps} from "../../Form/IFormProps";

const HOutlinedInput: React.FC<IFormProps> = (props) => {
    const {field, startAdornment, type, placeholder, endAdornment} = props

    return (
        <OutlinedInput fullWidth
                       required
                       {...field}
                       type={type}
                       placeholder={placeholder}
                       startAdornment={
                           startAdornment && (
                               <InputAdornment position={"start"}>
                                   {startAdornment}
                               </InputAdornment>
                           )
                       }
                       endAdornment={
                           endAdornment && (
                               <InputAdornment position={"start"}>
                                   {endAdornment}
                               </InputAdornment>
                           )
                       }
        />
    )
}

export default HOutlinedInput
