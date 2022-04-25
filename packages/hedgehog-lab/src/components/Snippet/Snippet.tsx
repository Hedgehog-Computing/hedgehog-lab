import {Box, Divider, Pagination} from "@mui/material";
import React from "react";
import SearchSnippet from "./Search/SearchSnippet";
import useSWR from "swr";
import {fetcher} from "../../network/fetcher";
import SnippetList from "./List/SnippetList";
import {Skeleton} from "@mui/lab";
import {useRecoilState} from "recoil";
import {searchState} from "../../states/RSnippetStates";

const Snippet = () => {
    const [search, setSearch] = useRecoilState(searchState)

    const q = search.text ? search.text : '*:*'

    const {data, error} = useSWR([`/aws-open-search?q=${q}&from=${search.from}&size=${search.size}`], fetcher);


    return (
        <>
            <SearchSnippet/>

            <Divider sx={{my: 2}}/>

            {data && 'hits' in data && (
                <>
                    <SnippetList snippets={data['hits']}/>
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        <Pagination count={data['total'] && Math.ceil(data['total']['value'] / search.size)}/>
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
