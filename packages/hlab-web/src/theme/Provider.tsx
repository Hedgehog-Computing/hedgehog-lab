import {createTheme, ThemeProvider} from '@mui/material/styles';

import useTheme from '@/store/theme';

import themes from './themes';
import type {CustomThemeProviderProps} from './types';
import React from 'react';

function CustomThemeProvider({children}: CustomThemeProviderProps) {
    const [theme] = useTheme();

    return <ThemeProvider theme={createTheme(themes[theme])}>{children}</ThemeProvider>;
}

export default CustomThemeProvider;
