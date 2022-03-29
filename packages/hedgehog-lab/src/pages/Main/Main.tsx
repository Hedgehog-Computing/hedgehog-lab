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

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            style={{
              height: "calc(100vh - 174px)",
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: { xs: resultFullScreen ? "none" : "block" } }}
            >
              <YourCode />
            </Grid>

            <Grid
              item
              xs={12}
              md={resultFullScreen ? 12 : 6}
              style={{
                height: "calc(100vh - 64px)",
                overflowY: "auto",
              }}
            >
              <Results />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
