import React, {ComponentType, StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {RecoilRoot} from 'recoil';

import ThemeProvider from '@/theme/Provider';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
    root.render(
        <StrictMode>
            <RecoilRoot>
                <HelmetProvider>
                    <ThemeProvider>
                        <App/>
                    </ThemeProvider>
                </HelmetProvider>
            </RecoilRoot>
        </StrictMode>,
    );
}

export default render;
