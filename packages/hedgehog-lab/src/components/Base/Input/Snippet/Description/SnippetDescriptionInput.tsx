import {Controller, useFormContext} from "react-hook-form";
import BaseOutlinedInput from "../../BaseOutlinedInput/BaseOutlinedInput";
import {DescriptionOutlined} from "@mui/icons-material";
import * as React from "react";

const name = 'description';

const SnippetDescriptionInput = () => {
    const useFormMethods = useFormContext()

    return (
        <Controller
            name={name}
            control={useFormMethods.control}
            defaultValue={''}
            render={({field}) =>
                <BaseOutlinedInput
                    field={field}
                    placeholder={'snippet description'}
                    adornment={{
                        start: <DescriptionOutlined/>
                    }}
                />
            }
        />
    )
}

export default SnippetDescriptionInput;
