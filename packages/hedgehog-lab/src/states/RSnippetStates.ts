import {atom} from "recoil";

export const showCodeBlockState = atom({
    key: "showCodeBlock",
    default: true,
});


export const searchState = atom<{ text: string; from: number; size: number }>({
    key: "search",
    default: {
        text: '',
        from: 0,
        size: 10,
    },
});

export const dialogState = atom<{ open: boolean }>({
    key: 'dialog',
    default: {
        open: false,
    },
})
