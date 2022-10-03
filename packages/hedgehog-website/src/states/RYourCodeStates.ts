import {atom, selector} from "recoil";

export const codeSavingFlagState = atom({
    key: 'codeSavingFlag',
    default: false
})

interface IEditorMetaState {
    title: string
    currentFile?: string,
    id: string,
    description: string,
}

const editorMetaAtom = atom<IEditorMetaState>({
    key: "editorMetaAtom",
    default: {
        title: '',
        currentFile: '',
        id: '',
        description: '',
    },
});


export const editorMetaState = selector({
    key: "editorMetaState",
    get: async ({get}) => {
        return get(editorMetaAtom);
    },
    set: ({set}, newValue: any) => {
        set(editorMetaAtom, newValue);
    }
});


export const editorCodeState = atom({
    key: 'editorCode',
    default: ''
})
