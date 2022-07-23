import { Box } from "@mui/system";
import React from "react";
import SnippetList from "../../components/Snippet/List/SnippetList";
import SearchSnippet from "../../components/Snippet/Search/SearchSnippet";
import Snippet from "../../components/Snippet/Snippet";
import Meta from '../../components/Meta/Meta';

const Explore = () => {
  return (
    <>
      <Meta title='Explore'/>
      <Snippet />
    </>
  );
};

export default Explore;
