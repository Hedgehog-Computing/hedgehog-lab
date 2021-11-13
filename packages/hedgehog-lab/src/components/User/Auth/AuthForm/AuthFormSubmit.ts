import {IAuthFormProps} from "./IAuthFormProps";

export const AuthFormSubmit = (method: string, data: IAuthFormProps): void => {
    switch (method) {
        case 'login':
            console.log('login')
            console.log(data)
            break
        case 'sign':
            console.log('sign')
            console.log(data)
            break
        case 'forget':
            console.log('forget')
            console.log(data)
            break
        default:
            console.log('default')
            break
    }
}
