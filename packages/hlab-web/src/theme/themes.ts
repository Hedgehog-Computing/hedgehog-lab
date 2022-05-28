import { ArrowDropDownRounded } from '@mui/icons-material';
import { ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import { Themes } from './types';

const sharedTheme = {
  palette: {
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          sizeLarge: {
            padding: '1rem 1.25rem',
            lineHeight: 21 / 16,
            fontWeight: 700,
          },
          containedPrimary: {
            color: '#fff',
          },
        },
        variants: [
          {
            props: { variant: 'code' },
            style: {
              border: '1px solid',
              fontWeight: 600,
              WebkitFontSmoothing: 'subpixel-antialiased',
            },
          },
        ],
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: {
            color: 'initial !important',
            display: 'inline-flex',
            alignItems: 'center',
            '&.MuiTypography-body1 > svg': {
              marginTop: 2,
            },
            '& svg:last-child': {
              marginLeft: 2,
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 5,
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: ArrowDropDownRounded,
        },
        styleOverrides: {
          iconFilled: {
            top: 'calc(50% - .25em)',
          },
        },
      },
      MuiTab: {
        defaultProps: {
          disableTouchRipple: true,
        },
        styleOverrides: {
          root: {
            minHeight: '48px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            '&[href]': {
              textDecorationLine: 'none',
            },
          },
        },
        outlined: {
          'a&, button&': {
            '&:hover': {
              boxShadow: '1px 1px 20px 0 rgb(90 105 120 / 20%)',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(32, 38, 45, 0.2)',
          backdropFilter: 'blur(2px)',
          opacity: 1,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          paddingTop: 7,
          paddingBottom: 7,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 32,
          height: 20,
          padding: 0,
          '& .MuiSwitch-switchBase': {
            '&.Mui-checked': {
              transform: 'translateX(11px)',
              color: '#fff',
            },
          },
        },
        switchBase: {
          height: 20,
          width: 20,
          padding: 0,
          color: '#fff',
          '&.Mui-checked + .MuiSwitch-track': {
            opacity: 1,
          },
        },
        thumb: {
          flexShrink: 0,
          width: '14px',
          height: '14px',
        },
      },
    },
  },
} as ThemeOptions;

const themes: Record<Themes, ThemeOptions> = {
  light: deepmerge(sharedTheme, {
    palette: {
      mode: 'light',
      background: {
        default: '#fafafa',
        paper: '#fff',
      },
      primary: {
        main: '#3f51b5',
      },
    },
  }),

  dark: deepmerge(sharedTheme, {
    palette: {
      mode: 'dark',
      background: {
        default: '#111',
        paper: '#171717',
      },
      primary: {
        main: '#007FFF',
      },
    },
  }),
};

export default themes;
