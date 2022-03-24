import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { tutorials } from "../../../tutorials";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import {
  BookOutlined,
  CreateOutlined,
  ExpandLessOutlined,
  ExpandMoreOutlined,
  FiberManualRecord,
  TextSnippetOutlined,
} from "@mui/icons-material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { sideBarWidth } from "../../YourCode/Config/SideBar";
import { sideBarOpenState } from "../../../states/RLayoutStates";
import { Link as RouteLink } from "react-router-dom";
import { editorCodeState } from "../../../states/RYourCodeStates";

const SideBar = (): React.ReactElement => {
  const [collapseOpen, setCollapseOpen] = useState(true);
  const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);
  const setEditorCode = useSetRecoilState(editorCodeState);

  const theme = useTheme();
  const lgBreakpoint = window.matchMedia("(min-width: 1910px)");
  const lgBreakpointMatches = lgBreakpoint.matches;

  const handleCollapseClick = useCallback(() => {
    setCollapseOpen(!collapseOpen);
  }, [collapseOpen]);

  const handleSetEditorCode = useCallback(
    (editorCode) => {
      setEditorCode(editorCode);
    },
    [setEditorCode]
  );

  useEffect(() => {
    setSideBarOpen(lgBreakpointMatches);
  }, [lgBreakpointMatches, setSideBarOpen]);

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={sideBarOpen}
      sx={{
        width: sideBarWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: sideBarWidth,
          boxSizing: "border-box",
        },
        borderRight: sideBarOpen ? "1px solid rgba(0, 0, 0, 0.12)" : "",
      }}
    >
      <Toolbar />

      <Box sx={{ overflow: "auto" }}>
        <List disablePadding>
          <Link
            component={RouteLink}
            to={`/snippets/new`}
            sx={{ display: "block" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <CreateOutlined />
              </ListItemIcon>

              <ListItemText>
                <Box fontWeight={"bold"} color={theme.palette.text.primary}>
                  New Snippet
                </Box>
              </ListItemText>
            </ListItemButton>
          </Link>

          <Divider />

          <ListItem button onClick={handleCollapseClick}>
            <ListItemIcon>
              <TextSnippetOutlined
                color={collapseOpen ? "primary" : "inherit"}
              />
            </ListItemIcon>
            <ListItemText>
              <Box fontWeight={"bold"}>My Snippets</Box>
            </ListItemText>
            {collapseOpen ? (
              <ExpandLessOutlined color={"primary"} />
            ) : (
              <ExpandMoreOutlined />
            )}
          </ListItem>

          <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{
                borderLeft: "solid 1px",
                ml: "27px",
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                borderColor: theme.palette.primary[500],
              }}
            >
              {tutorials.map((tutorial, index) => {
                return (
                  <Link
                    key={index}
                    sx={{ display: "block" }}
                    component={RouteLink}
                    to={`/tutorial/${tutorial.description}?auto_run=true`}
                  >
                    <ListItemButton
                      onClick={() => {
                        handleSetEditorCode(tutorial.source);
                      }}
                    >
                      <ListItemText>
                        <FiberManualRecord
                          sx={{
                            fontSize: "5px",
                            color: theme.palette.grey[500],
                            ml: "6px",
                          }}
                        />

                        <Typography
                          color={theme.palette.text.primary}
                          variant={"body2"}
                          component={"span"}
                          sx={{ ml: "18px" }}
                        >
                          {tutorial.description}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </Link>
                );
              })}
            </List>

            <Box sx={{ textAlign: "center", mt: 1 }}>
              <Button
                variant="outlined"
                size="small"
                component={RouteLink}
                to={`/hhlab`}
              >
                All
              </Button>
            </Box>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
