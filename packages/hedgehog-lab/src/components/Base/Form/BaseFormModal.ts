import {IBaseFormProps} from "./IBaseFormProps";
import {loginModal} from "../../../modals/login/loginModal";

export const BaseFormModal = (method: string, data: IBaseFormProps): void => {
    switch (method) {
        case 'login':
            loginModal()
            break
        case 'sign':
            console.log('sign')
            console.log(data)
            break
        case 'forget':
            console.log('forget')
            console.log(data)
            break
        case 'settingAccount':
            console.log('settingAccount')
            console.log(data)
            break
        default:
            console.log('default')
            break
    }
}
