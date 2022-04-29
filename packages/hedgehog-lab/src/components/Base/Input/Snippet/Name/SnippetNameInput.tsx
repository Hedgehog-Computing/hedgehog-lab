import {Controller, useFormContext} from "react-hook-form";
import * as React from "react";
import {DriveFileRenameOutlineOutlined} from "@mui/icons-material";
import BaseOutlinedInput from "../../BaseOutlinedInput/BaseOutlinedInput";
import {BaseTextFieldProps} from "@mui/material";

const name = 'title'

const SnippetNameInput: React.FC<BaseTextFieldProps> = (props): React.ReactElement => {
    const useFormMethods = useFormContext()

    return (
        <Controller
            name={name}
            control={useFormMethods.control}
            defaultValue={''}
            render={({field}) =>
                <BaseOutlinedInput
                    size={props.size}
                    field={field}
                    placeholder={'Snippet name'}
                    adornment={{
                        start: <DriveFileRenameOutlineOutlined/>
                    }}
                />
            }
        />
    )
}


export default SnippetNameInput
