import React, { useEffect, useState } from "react";
import Qs from "qs";
import { Grid } from "@mui/material";
import Results from "../../components/Results/Results";
import YourCode from "../../components/YourCode/YourCode";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { tutorials } from "../../tutorials";
import { compilerResultState } from "../../states/RCompilerStates";
import { useCompiler } from "../../hooks/useCompilier";
import { resultFullScreenState } from "../../states/RLayoutStates";
import { useEditor } from "../../hooks/useEditor";

const DEFAULT_SOURCE = `//write your code here
print("hello world")
`;

const Main = (): React.ReactElement => {
  const [resultFullScreen, setResultFullScreen] = useRecoilState<boolean>(
    resultFullScreenState
  );

  const { editorCode, setEditorCode } = useEditor();

  useEffect(() => {
    const lastRunningCode = localStorage.getItem("lastRunningCode");
    if (editorCode === "") {
      setEditorCode(lastRunningCode);
    }
  }, [editorCode, setEditorCode]);

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: resultFullScreen ? "none" : "block" } }}
        >
          <YourCode />
        </Grid>

        <Grid item xs={12} md={resultFullScreen ? 12 : 6}>
          <Results />
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
