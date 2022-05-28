import { Divider, Link } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const FlexBox = styled(Box)({
  display: 'flex',
});

const CenteredFlexBox = styled(FlexBox)({
  justifyContent: 'center',
  alignItems: 'center',
});

const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: '100%',
  height: '100%',
});

const PlainLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

const PlainDivider = styled(Divider)({
  borderColor: 'rgba(0, 0, 0, 0.1)',
});

export { FlexBox, CenteredFlexBox, FullSizeCenteredFlexBox, PlainLink, PlainDivider };
