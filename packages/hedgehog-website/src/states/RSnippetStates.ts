import {atom} from "recoil";
import {ISnippetsProps} from "../components/Snippet/List/SnippetList";

export const showCodeBlockState = atom({
    key: "showCodeBlock",
    default: true,
});

export const userSnippetApiUrlState = atom({
    key: "userSnippetApiUrl",
    default: "",
})

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

export const userMetaState = atom<{
    userInfo: { description: string };
    snippet: { count: number, liked: number }
}>({
    key: "userMeta",
    default: {
        userInfo: {
            description: ''
        },
        snippet: {
            count: 0,
            liked: 0,
        }
    },
});

export const snippetsState = atom<ISnippetsProps[]>({
    key: 'snippetsData',
    default: [{
        id: '',
        title: '',
        description: '',
        content: '',
        user: {
            username: '',
        },
        visibility: '',
        createdAt: '',
        updatedAt: '',
        _count: {
            snippetLike: 0,
        },
        snippetLike: [],
        userId: '',
    }
    ]
})
