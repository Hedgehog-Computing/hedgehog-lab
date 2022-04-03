import { Divider, Box, Pagination } from "@mui/material";
import React from "react";
import SnippetList from "./List/SnippetList";
import SearchSnippet from "./Search/SearchSnippet";

const Snippet = () => {
  return (
    <>
      <SearchSnippet />

      <Divider sx={{ my: 2 }} />

      <SnippetList />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination count={10} />
      </Box>
    </>
  );
};

export default Snippet;
