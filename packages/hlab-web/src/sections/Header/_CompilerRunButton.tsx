import React from 'react';

import { Button } from '@mui/material';

import { useCompiler } from '@/hooks/useCompilier';


const CompilerRunButton = () => {
  const { run } = useCompiler();
  return (
    <Button variant={'contained'} onClick={() => run}>
      Run
    </Button>
  );
};

export default CompilerRunButton;
