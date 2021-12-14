import React, {useCallback} from "react";
import {NightsStayOutlined, WbSunnyOutlined} from "@mui/icons-material";
import {IconButton, useTheme} from "@mui/material";
import {useRecoilState} from "recoil";
import {themeModState} from "../../../themes/RThemeStates";

const SwitchThemeButton = (): React.ReactElement => {
    const theme = useTheme()
    const [themeMode, setThemeMode] = useRecoilState(themeModState)

    const handleThemeSwitch = useCallback(() => {
        const appTheme = themeMode === 'light' ? 'dark' : 'light'
        setThemeMode(appTheme)
        localStorage.setItem('theme', appTheme)
    }, [setThemeMode, themeMode])

    return (
        <IconButton onClick={handleThemeSwitch}>
            {theme.palette.mode === 'light' ? (<NightsStayOutlined/>) : (<WbSunnyOutlined/>)}
        </IconButton>
    )
}

export default SwitchThemeButton
