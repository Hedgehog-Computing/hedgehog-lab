import React, { ChangeEvent, FC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Tooltip} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      display: 'none'
    },
    upLoad: {
      width: '100%',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: 'rgba(0, 0, 0, 0.87)'
    },
    tooltip: {
      fontSize: '1rem'
    }
  })
);

interface UploadButtonProps {
  handleLoadFile: (str: string) => void;
}

const UploadButton: React.FC<UploadButtonProps> = (props: UploadButtonProps) => {
  const { handleLoadFile } = props;
  const classes = useStyles();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const resultFile = files[0];
    const reader = new FileReader();
    reader.readAsText(resultFile, 'UTF-8');
    reader.onload = function (e) {
      if (!e.target) return;
      const fileContent = e.target.result;
      const reg = /(.md)$/g;
      if (!fileContent) return;
      if (reg.test(resultFile.name)) {
        handleLoadFile(`markdown(\`\n${fileContent as string}\n\`)`);
      } else {
        handleLoadFile(fileContent as string);
      }
    };
  };

  return (
    <React.Fragment>
      <input
        accept=".js,.md"
        className={classes.input}
        id="contained-button-file"
        multiple={false}
        type="file"
        onChange={handleFileChange}
      />
      <Tooltip
        placement="top"
        classes={{ tooltip: classes.tooltip }}
        title={'Load local .md or .js files'}
        arrow>
        <label htmlFor="contained-button-file">
          <IconButton color="primary" component="span" className={classes.upLoad}>
            <CloudUploadIcon/>
          </IconButton>
        </label>
      </Tooltip>
    </React.Fragment>
  );
};

export default UploadButton
