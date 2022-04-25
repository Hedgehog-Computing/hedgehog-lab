import {atom, selector} from "recoil";

export const codeSavingFlagState = atom({
    key: 'codeSavingFlag',
    default: false
})

interface IEditorMetaState {
    title: string
}

const editorMetaAtom = atom<IEditorMetaState>({
    key: "editorMetaAtom",
    default: {
        title: ''
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
