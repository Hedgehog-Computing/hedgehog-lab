import { useEffect } from 'react';
import { queryCache, useQuery } from 'react-query';

import { OutputResult, compiler } from '@/compiler/compiler';

export const useCompiler = () => {
  const { isFetching: isLoading, refetch } = useQuery<OutputResult, readonly [string, string]>(
    ['compiler'],
    compiler,
    {
      retry: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (result) => {
        console.log('success');
      },
      onError: (lastError: any) => {
        // It's necessary to output all exception messages to user at output textbox,
        // including execution runtime exception and compiling exception -Lidang
        console.log('compiler error: \n' + lastError.toString());
      },
    },
  );

  useEffect(() => {
    queryCache.cancelQueries(['compiler']);
  }, []);

  return { loading: isLoading, run: refetch };
};
