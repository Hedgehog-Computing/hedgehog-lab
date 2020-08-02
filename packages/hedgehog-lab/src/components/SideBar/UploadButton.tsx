import React, { ChangeEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      display: 'none'
    },
    upLoad: {
      width: '50%',
      background: green[500],
      fontSize: '0.875rem',
      fontWeight: 500,
      '&:hover': {
        backgroundColor: green[700]
      }
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
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span" className={classes.upLoad}>
          Upload
        </Button>
      </label>
    </React.Fragment>
  );
};

export default UploadButton;
