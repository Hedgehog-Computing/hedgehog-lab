import {useQuery} from "react-query";
import {compiler, OutputResult} from "../../compiler";
import React, {useEffect} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {editorCodeState} from "../YourCode/RYourCodeStates";
import {compilerLoadingState, compilerReFetchState, compilerResultState} from "./RCompilerStates";

export const Compiler = (): React.ReactElement => {
    const setCompilerLoading = useSetRecoilState<boolean>(compilerLoadingState)
    const editorCode = useRecoilValue<string>(editorCodeState)
    const setCompilerResult = useSetRecoilState<any>(compilerResultState);
    const [compilerReFetch, setCompilerReFetch] = useRecoilState<boolean>(compilerReFetchState);

    const {isFetching: isLoading, refetch} = useQuery<OutputResult,
        readonly [string, string]
        //Error
        >(['compiler', editorCode], compiler, {
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
            console.log('Hedgehog Lab error: \n' + lastError.toString());
            setCompilerResult({
                outputItem: [],
                outputString: lastError.toString()
            });
        }
    });

    const reFetchCodeForce = () => {
        setCompilerResult({
            outputItem: [],
            outputString: ''
        });

        refetch({force: true} as any).finally(() => setCompilerReFetch(false))
    }

    useEffect(() => {
        if (compilerReFetch) {
            reFetchCodeForce()
        }
    }, [compilerReFetch])

    useEffect(() => {
        setCompilerLoading(isLoading)
    }, [isLoading])

    return (<></>)
}
