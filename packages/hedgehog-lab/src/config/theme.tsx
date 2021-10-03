import {createTheme} from "@mui/material/styles";

const defaultShadow = '0 2px 30px -1px rgba(85,85,85,.08),0 4px 30px 0 rgba(85,85,85,.06),0 1px 30px 0 rgba(85,85,85,.03)'

const theme = createTheme({
    palette: {
        mode: 'light'
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: defaultShadow
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRight: "none",
                    boxShadow: defaultShadow,
                    marginTop: 57
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    textTransform: 'capitalize'
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(32, 38, 45, 0.2)',
                    backdropFilter: 'blur(2px)',
                    transition: 'opacity 120ms ease 0s',
                    opacity: 1
                },
                paper: {
                    boxShadow: defaultShadow
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: '22px',
                    marginRight: '12px'
                }
            }
        }
    }
});

export default theme
