import {queryCache, useQuery} from "react-query";
import {compiler, OutputResult} from "../compiler";
import {useEffect} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {editorCodeState} from "../states/RYourCodeStates";
import {compilerLoadingState, compilerReFetchState, compilerResultState,} from "../states/RCompilerStates";

export const useCompiler = (): readonly [
  (valOrUpdater: ((currVal: boolean) => boolean) | boolean) => void,
  boolean
] => {
  const setCompilerLoading = useSetRecoilState<boolean>(compilerLoadingState);
  const editorCode = useRecoilValue<string>(editorCodeState);
  const setCompilerResult = useSetRecoilState<any>(compilerResultState);
  const [compilerReFetch, setCompilerReFetch] = useRecoilState<boolean>(
      compilerReFetchState
  );

  const {isFetching: isLoading, refetch} = useQuery<OutputResult,
      readonly [string, string]
      //Error
      >(["compiler", editorCode], compiler, {
    retry: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: (result) => {
      setCompilerResult(result);
    },
    onError: (lastError: any) => {
      // It's necessary to output all exception messages to user at output textbox,
      // including execution runtime exception and compiling exception -Lidang
      console.log("Hedgehog Lab error: \n" + lastError.toString());
      setCompilerResult({
        outputItem: [],
        outputString: lastError.toString(),
      });
    },
  });

  useEffect(() => {
    const reFetchCodeForce = () => {
      setCompilerResult({
        outputItem: [],
        outputString: "",
      });

      setCompilerLoading(true);

      refetch({force: true} as any).finally(() => setCompilerReFetch(false));
    };

    if (compilerReFetch) {
      reFetchCodeForce();
    }
  }, [
    compilerReFetch,
    refetch,
    setCompilerReFetch,
    setCompilerResult,
    editorCode,
  ]);

  useEffect(() => {
    setCompilerLoading(isLoading);
  }, [isLoading, setCompilerLoading]);

  useEffect(() => {
    queryCache.cancelQueries(["compiler"]);
  }, []);

  return [setCompilerReFetch, isLoading] as const;
};
