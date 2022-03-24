import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { GitHub as GitHubIcon, MenuBookOutlined } from "@mui/icons-material";

interface IRightButtonProps {
  href: string;
  render: React.ReactNode;
  tooltip: string;
}

const RightButton = (): React.ReactElement => {
  const rightButton: Array<IRightButtonProps> = [
    {
      href: "https://hedgehog-book.github.io",
      render: <MenuBookOutlined />,
      tooltip: "Book",
    },
    {
      href: "https://github.com/Hedgehog-Computing/hedgehog-lab",
      render: <GitHubIcon />,
      tooltip: "Github",
    },
  ];

  return (
    <>
      {rightButton.map((item, index) => (
        <Tooltip title={item.tooltip} arrow key={index}>
          <IconButton href={item.href} target={"_blank"}>
            {item.render}
          </IconButton>
        </Tooltip>
      ))}

      {/* <SwitchThemeButton/> */}
    </>
  );
};

export default RightButton;
