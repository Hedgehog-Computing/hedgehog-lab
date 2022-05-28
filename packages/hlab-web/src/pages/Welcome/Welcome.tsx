import React from 'react';

import { Box, Grid } from '@mui/material';

import Editor from '@monaco-editor/react';

import Meta from '@/components/Meta';

function Welcome() {
  return (
    <>
      <Meta title="Welcome" />
      <Box height="calc(100vh - 110px)">
        <Grid container height={'100%'}>
          <Grid item xs={12} md={6}>
            <Editor
              language="javascript"
              height="100%"
              options={{
                wordWrap: 'on' as const,
                scrollBeyondLastLine: false,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box px={1}>Result</Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Welcome;
