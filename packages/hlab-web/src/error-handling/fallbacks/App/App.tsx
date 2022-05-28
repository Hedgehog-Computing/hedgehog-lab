import React from 'react';

import { EmailOutlined, ForumOutlined } from '@mui/icons-material';
import RestartIcon from '@mui/icons-material/RestartAlt';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { FullSizeCenteredFlexBox } from '@/components/styled';
import { email, messages } from '@/config';
import resetApp from '@/utils/reset-app';

function AppErrorBoundaryFallback() {
  return (
    <Box height={400}>
      <FullSizeCenteredFlexBox>
        <Paper sx={{ p: 5 }} variant={'outlined'}>
          <Typography variant="h5" component="h3">
            {messages.app.crash.title}
          </Typography>
          <Button
            endIcon={<EmailOutlined />}
            variant="outlined"
            target="_blank"
            rel="noreferrer"
            href={`mailto: ${email}`}
            sx={{ my: 2 }}
          >
            {messages.app.crash.options.email}
          </Button>

          <br />
          <Button
            endIcon={<ForumOutlined />}
            variant={'outlined'}
            href={'https://discord.gg/kmuBw8pRFf'}
            target={'_blank'}
            sx={{ mb: 2 }}
          >
            Join our discord and give us feedback
          </Button>

          <Typography component="h6">or</Typography>
          <Button endIcon={<RestartIcon />} sx={{ mt: 3 }} variant="outlined" onClick={resetApp}>
            {messages.app.crash.options.reset}
          </Button>
        </Paper>
      </FullSizeCenteredFlexBox>
    </Box>
  );
}

export default AppErrorBoundaryFallback;
