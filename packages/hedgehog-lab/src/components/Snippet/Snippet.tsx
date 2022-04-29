import {Box, Divider, Pagination} from "@mui/material";
import React, {useCallback, useEffect} from "react";
import SearchSnippet from "./Search/SearchSnippet";
import useSWR from "swr";
import {fetcher} from "../../network/fetcher";
import SnippetList from "./List/SnippetList";
import {Skeleton} from "@mui/lab";
import {useRecoilState, useResetRecoilState} from "recoil";
import {searchState, userMetaState} from "../../states/RSnippetStates";
import {useAuth} from "../../hooks/useAuth";
import {useMatch} from "react-router-dom";

const Snippet = () => {
    const [search, setSearch] = useRecoilState(searchState)
    const reSetSearch = useResetRecoilState(searchState)
    const {auth} = useAuth()
    const [userMeta, setUserMeta] = useRecoilState(userMetaState)

    const q = search.text ? search.text : '*:*'

    const exploreUrl = `/aws-open-search?q=${q}&from=${search.from}&size=${search.size}`
    const mySnippetsUrl = `/snippets/mySnippets?token=${auth.accessToken}`
    const me = useMatch(`u/${auth.user.firstname}`)
    let url = me ? mySnippetsUrl : exploreUrl

    const isUserSnippet = useMatch('/u/:userId')
    const currentName = isUserSnippet?.params.userId ?? ''

    const isUserSnippetLike = useMatch('/u/:userId/likes')

    if (isUserSnippet) {
        url = `${exploreUrl}&author=${currentName}`
    }


    const {data, error} = useSWR([url], fetcher);

    const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
        setSearch({...search, from: value})
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [search, setSearch])

    useEffect(() => {
        data && setUserMeta({snippet: {count: data['total']['value'], liked: 0}})
    }, [data, setUserMeta])

    useEffect(() => {
        reSetSearch()
    }, [currentName])


    return (
        <>
            <SearchSnippet/>

            <Divider sx={{my: 2}}/>

            {data && 'hits' in data && (
                <>
                    <SnippetList snippets={data['hits']}/>
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        <Pagination onChange={handlePageChange}
                                    page={search.from}
                                    count={data['total'] && Math.ceil(data['total']['value'] / search.size)}/>
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
