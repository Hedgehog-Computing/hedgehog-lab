import React from 'react';

import { ThemeProvider } from '@mui/material/styles';

import { labTheme } from '@/theme/labTheme';

import type { CustomThemeProviderProps } from './types';


function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  return <ThemeProvider theme={labTheme('light')}>{children}</ThemeProvider>;
}

export default CustomThemeProvider;
