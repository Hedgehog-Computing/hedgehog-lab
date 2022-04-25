import {Box, Divider, Pagination} from "@mui/material";
import React, {useState} from "react";
import SearchSnippet from "./Search/SearchSnippet";
import useSWR from "swr";
import {fetcher} from "../../network/fetcher";
import SnippetList from "./List/SnippetList";

const Snippet = () => {
    const [size, setSize] = useState(5)
    const {data, error} = useSWR([`/aws-open-search?q=*:*&from=0&size=${size}`], fetcher);

    return (
        <>
            <SearchSnippet/>

            <Divider sx={{my: 2}}/>

            {data && 'hits' in data && (
                <>
                    <SnippetList snippets={data['hits']}/>
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        <Pagination count={data['total'] && Math.ceil(data['total']['value'] / size)}/>
                    </Box>
                </>
            )}


        </>
    );
};

export default Snippet;
