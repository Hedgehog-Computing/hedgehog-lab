import React from "react";
import { Helmet } from "react-helmet-async";
import type { MetaProps } from './types';

function Meta({
    title,
}: MetaProps) {
    const pageTitle = `${title ? title : 'Hlab'} - Hedgehog Lab`;

    return (
        <Helmet
            title = {pageTitle}
        />
    )
}

export default Meta;