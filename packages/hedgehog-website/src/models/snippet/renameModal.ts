import * as yup from "yup";
import {ISnippetName} from "../../interfaces/ISnippetName";

export const renameModal = (data: ISnippetName): void => {
    console.log(data)
}

export const renameRule = yup.object({
    name: yup.string().required(),
}).required();
