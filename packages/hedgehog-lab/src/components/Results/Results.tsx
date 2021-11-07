import React from "react";
import {
  CircularProgress,
  TextareaAutosize,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import Output from "../Output";
import { OutputItem } from "hedgehog-core-js";

interface ResultsProps {
  executionOutputList: OutputItem[];
  executionOutputString: string;
  loading: boolean;
}

const Results: React.FC<ResultsProps> = (props: ResultsProps) => {
  const { executionOutputList, executionOutputString, loading } = props;

  return (
    <div style={{ height: "100%" }}>
      <Card
        style={{
          height: "100%",
          overflowY: "auto",
          overflowX: "auto",
          borderRadius: 0,
        }}
      >
        {executionOutputList.length === 0 && executionOutputString === "" ? (
          <div className={"no-code"}>
            <div className="no-code-content">
              {loading ? (
                <CircularProgress size={50} style={{ color: "black" }} />
              ) : document.body.clientWidth < 960 ? (
                <ArrowUpwardOutlinedIcon style={{ fontSize: 50 }} />
              ) : (
                <ArrowBackOutlinedIcon style={{ fontSize: 50 }} />
              )}
              <p>
                {loading
                  ? "Loading..."
                  : `Please write your code on the ${
                      document.body.clientWidth < 960 ? "top" : "left"
                    } and click the 'Compile and run' button`}
              </p>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <Paper
              variant={"outlined"}
              sx={{ p: 2, minHeight: "100%", borderRadius: 0 }}
            >
              {executionOutputList.length > 0 && (
                <div>
                  <Output outputItemList={executionOutputList} />
                </div>
              )}
              {executionOutputString && (
                <pre
                  style={{
                    fontFamily: "monospace",
                    fontWeight: 400,
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  {executionOutputString}
                </pre>
              )}
            </Paper>
          </React.Fragment>
        )}
      </Card>
    </div>
  );
};

export default Results;
