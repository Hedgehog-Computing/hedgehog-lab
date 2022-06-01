import React from 'react';

import { Button } from '@mui/material';

interface ButtonProp {
  icon: React.ReactElement;
  text: string;
  link: string;
}

export interface HeaderButtonProps {
  data: ButtonProp[];
}

const HeaderButtons: React.FC<HeaderButtonProps> = (props) => {
  return (
    <>
      {props.data.map((item) => (
        <Button
          key={item.text}
          disableElevation
          sx={{ mr: 1 }}
          size={'small'}
          color={'inherit'}
          endIcon={item.icon}
          href={item.link}
          target={'_blank'}
          variant={'contained'}
        >
          {item.text}
        </Button>
      ))}
    </>
  );
};

export default HeaderButtons;
