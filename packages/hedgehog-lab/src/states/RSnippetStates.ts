import {atom} from "recoil";

export const showCodeBlockState = atom({
    key: "showCodeBlock",
    default: true,
});


export const searchState = atom<{ text: string; from: number; size: number }>({
    key: "search",
    default: {
        text: '',
        from: 1,
        size: 10,
    },
});

export const dialogState = atom<{ open: boolean }>({
    key: 'dialog',
    default: {
        open: false,
    },
})

export const userMetaState = atom<{ snippet: { count: number, liked: number } }>({
    key: "userMeta",
    default: {
        snippet: {
            count: 0,
            liked: 0,
        }
    },
});
