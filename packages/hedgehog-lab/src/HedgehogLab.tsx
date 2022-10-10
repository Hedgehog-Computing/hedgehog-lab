import React from "react";
import SnippetEditor, {ISnippetEditor} from "@hedgehogcomputing/website/src/pages/Snippets/Editor";

const HedgehogLab: React.FC<ISnippetEditor> = (props) => {
    return (
        <SnippetEditor {...props}/>
    )
}

export default HedgehogLab;