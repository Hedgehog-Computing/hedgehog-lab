import {Controller, useFormContext} from "react-hook-form";
import BaseOutlinedInput from "../../BaseOutlinedInput/BaseOutlinedInput";
import {DescriptionOutlined} from "@mui/icons-material";
import * as React from "react";
import {BaseTextFieldProps} from "@mui/material";

const name = 'description';

const SnippetDescriptionInput: React.FC<BaseTextFieldProps> = (props) => {
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
                    placeholder={'Snippet description'}
                    adornment={{
                        start: <DescriptionOutlined/>
                    }}
                />
            }
        />
    )
}

export default SnippetDescriptionInput;
