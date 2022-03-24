import {Controller, useFormContext} from "react-hook-form";
import * as React from "react";
import {DriveFileRenameOutlineOutlined} from "@mui/icons-material";
import BaseOutlinedInput from "../../BaseOutlinedInput/BaseOutlinedInput";

const name = 'name'

const SnippetNameInput = (): React.ReactElement => {
    const useFormMethods = useFormContext()

    return (
        <Controller
            name={name}
            control={useFormMethods.control}
            defaultValue={''}
            render={({field}) =>
                <BaseOutlinedInput
                    field={field}
                    placeholder={'snippet name'}
                    adornment={{
                        start: <DriveFileRenameOutlineOutlined/>
                    }}
                />
            }
        />
    )
}


export default SnippetNameInput
