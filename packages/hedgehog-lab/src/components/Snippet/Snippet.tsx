import {Box, Divider, Pagination} from "@mui/material";
import React, {useCallback, useEffect} from "react";
import SearchSnippet from "./Search/SearchSnippet";
import useSWR from "swr";
import {fetcher} from "../../network/fetcher";
import SnippetList from "./List/SnippetList";
import {Skeleton} from "@mui/lab";
import {useRecoilState, useResetRecoilState, useSetRecoilState} from "recoil";
import {searchState, snippetsState, userMetaState, userSnippetApiUrlState} from "../../states/RSnippetStates";
import {useAuth} from "../../hooks/useAuth";
import {useMatch} from "react-router-dom";

const Snippet = () => {
    const [search, setSearch] = useRecoilState(searchState)
    const reSetSearch = useResetRecoilState(searchState)
    const {auth} = useAuth()
    const [userMeta, setUserMeta] = useRecoilState(userMetaState)
    const setUserSnippetApiUrl = useSetRecoilState(userSnippetApiUrlState)

    const q = search.text ? search.text : '*:*'

    const isUserSnippet = useMatch('/u/:userId')
    const currentName = isUserSnippet?.params.userId ?? ''

    const exploreUrl = `/snippets/all?size=${search.size}&from=${search.from}`
    const searchUrl = `/aws-open-search?q=${q}&from=${search.from}&size=${search.size}`
    const mySnippetsUrl = `/snippets/mySnippets?token=${auth.accessToken}`
    const snippetMetaUrl = `/snippets/meta?user=${currentName}`
    const me = useMatch(`u/${auth.user.username}`)
    const explorePage = useMatch('/explore')
    let url = me ? mySnippetsUrl : exploreUrl


    const isUserSnippetLike = useMatch('/u/:userId/likes')

    let token = ''
    if (auth.accessToken) {
        token = `token=${auth.accessToken}`
    }

    if (explorePage) {
        url = `${exploreUrl}&${token}`
    }

    const queryParams = `q=${search.text}`
    if (isUserSnippet) {
        url = `${exploreUrl}&user=${currentName}&${token}`
    }

    if (isUserSnippetLike) {
        url = `${exploreUrl}&user=${isUserSnippetLike?.params.userId}&likedByUser=${isUserSnippetLike?.params.userId}&${token}`
    }

    if (search.text && explorePage) {
        url = searchUrl
    } else if (search.text) {
        url = url + `&${queryParams}`
    }

    setUserSnippetApiUrl(url)

    const {data, error} = useSWR([url], fetcher);
    const {data: snippetMeta, error: snippetMetaError} = useSWR(snippetMetaUrl, fetcher);

    const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
        setSearch({...search, from: value})
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [search, setSearch])

    useEffect(() => {
        snippetMeta && setUserMeta({
            snippet: {
                count: snippetMeta?.response?.result['snippetCount'],
                liked: snippetMeta?.response?.result['snippetLikeCount']
            }
        })
    }, [setUserMeta, snippetMeta])

    useEffect(() => {
        reSetSearch()
    }, [currentName])

    const setSnippets = useSetRecoilState(snippetsState)

    data && data?.response?.result && setSnippets(data?.response?.result)
    return (
        <>
            <SearchSnippet/>

            <Divider sx={{my: 2}}/>

            {data && data?.response?.result && (
                <>
                    <SnippetList snippets={data?.response?.result}/>
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        <Pagination onChange={handlePageChange}
                                    page={search.from}
                                    count={data?.response?.meta?.count && Math.ceil(data?.response?.meta?.count / search.size)}/>
                    </Box>
                </>
            )}

            {!data && (
                <Skeleton variant="rectangular" width="100%" height={200}/>
            )}


        </>
    );
};

export default Snippet;
