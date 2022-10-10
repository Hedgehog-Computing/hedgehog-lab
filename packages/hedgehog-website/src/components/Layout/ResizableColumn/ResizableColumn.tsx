import {Box, Theme, useTheme} from "@mui/material";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {alpha, SxProps} from "@mui/system";
import {isNumber} from "lodash";

const handlerWidth = 5;

export const ResizableColumn = (
    (props: {
        width?: number | string;
        maxWidth: number;
        minWidth: number;
        children?: React.ReactNode;
        sx?: SxProps<Theme>;
        onWidthChange?: (width: number) => void;
        right?: boolean;
        hidden?: boolean;
    }) => {
        const {
            width = 260,
            children,
            sx,
            maxWidth,
            minWidth,
            onWidthChange,
            right,
            hidden,
        } = props;
        const [realWidth, setRealWidth] = useState(width);
        const [oldWidth, setOldWidth] = useState(width);
        const [draging, setDraging] = useState(false);
        const [firstX, setFirstX] = useState(0);
        const theme = useTheme();

        const ref = useRef<HTMLElement>(null);

        useEffect(() => {
            setRealWidth(width);
        }, [width]);

        const handleMouseDown = useCallback(
            (event: React.MouseEvent<HTMLElement>) => {
                document.body.classList.add("drawer-resizing");
                setDraging(true);
                setFirstX(event.clientX);
                setOldWidth(realWidth);
            },
            [realWidth]
        );

        const handleMouseMove = useCallback(
            (event: MouseEvent) => {
                if (draging && isNumber(oldWidth)) {
                    const newWidth = right
                        ? oldWidth - (event.clientX - firstX)
                        : oldWidth + (event.clientX - firstX);
                    if (newWidth >= minWidth && newWidth <= maxWidth) {
                        //setLastX(event.x);
                        setRealWidth(newWidth);
                        onWidthChange && onWidthChange(newWidth);
                    }
                }
            },
            [draging, firstX, maxWidth, minWidth, oldWidth, onWidthChange, right]
        );

        const handleMouseup = useCallback(() => {
            document.body.classList.remove("drawer-resizing");
            setDraging(false);
        }, []);

        useEffect(() => {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseup);
            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseup);
            };
        }, [handleMouseMove, handleMouseup]);

        return (
            <Box
                ref={ref}
                sx={{
                    height: "100%",
                    width: hidden ? 0 : realWidth,
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "stretch",
                    position: "relative",
                    transition: draging ? undefined : "width 0.3s",
                    ...sx,
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        minWidth: hidden ? 0 : realWidth,
                        width: hidden ? 0 : realWidth,
                        height: "100%",
                        display: "flex",
                        flexFlow: "column",
                        overflowX: "hidden",
                        transition: draging ? undefined : "all 0.3s",
                    }}
                >
                    {children}
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        height: "100%",
                        top: 0,
                        right: right ? "auto" : -handlerWidth / 2,
                        left: right ? -handlerWidth / 2 : "auto",
                        cursor: "w-resize",
                        width: handlerWidth,
                        backgroundColor: draging
                            ? alpha(theme.palette.primary.main, 0.8)
                            : '#000',
                        zIndex: 2,
                        "&:hover": {
                            //backgroundColor: alpha(theme.palette.primary.main, 0.8),
                        },
                    }}
                    onMouseDown={handleMouseDown}
                ></Box>
            </Box>
        );
    }
);
