import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const HotKeysButton = styled(Button)(({ theme }) => ({
  height: 'fit-content',
  alignSelf: 'center',
  marginRight: theme.spacing(1),
  borderColor: theme.palette.text.disabled,
  '&:hover': {
    borderColor: theme.palette.text.disabled,
  },
  color: theme.palette.text.disabled,
}));

export { HotKeysButton };
