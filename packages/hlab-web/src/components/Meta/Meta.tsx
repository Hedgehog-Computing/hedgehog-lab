import {Helmet} from 'react-helmet-async';

import {defaultMetaTags, title as appTitle} from '@/config';

import type {MetaProps} from './types';
import React from 'react';

function Meta({
                  description = defaultMetaTags.description,
                  meta = [],
                  title,
                  image = defaultMetaTags.image,
              }: MetaProps) {
    const pageTitle = `${title ? title + '-' : ''} ${appTitle}`;

    return (
        <Helmet
            title={pageTitle}
            meta={[
                {
                    name: 'description',
                    content: description,
                },
                {
                    property: 'og:title',
                    content: pageTitle,
                },
                {
                    property: 'og:description',
                    content: description,
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    property: 'og:image',
                    content: image,
                },
                {
                    name: 'twitter:card',
                    content: 'Run, compile and execute JavaScript for Scientific Computing and Data Visualization TOTALLY TOTALLY TOTALLY in your BROWSER! An open source scientific computing environment for JavaScript TOTALLY in your browser, matrix operations with GPU acceleration, TeX support, data visualization and symbolic computation.',
                },
                {
                    name: 'twitter:title',
                    content: pageTitle,
                },
                {
                    name: 'twitter:description',
                    content: description,
                },
            ].concat(meta)}
        />
    );
}

export default Meta;
