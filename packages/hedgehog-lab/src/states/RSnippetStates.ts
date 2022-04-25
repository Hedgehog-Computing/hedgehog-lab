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
