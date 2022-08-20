import React, { useCallback, useState } from 'react';
import {
  Typography,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  makeStyles
} from '@mui/styles';

import ReactAce from 'react-ace';

import { mappingFromTwilio } from './mappingFromTwilio';

const useStyles = makeStyles(() => ({
  root: {
    '& #ace-editor': {
      width: '100% !important'
    }
  },
  alert: {
  },
  guide: {
    fontSize: '14px !important',
    fontWeight: '400 !important',
    margin: '20px 0 !important'
  }
}));

const JsonDataView = ({ onImport, onClose, workspaces, workflows }) => {
  const classes = useStyles();
  const [data, setData] = useState();
  const handleImport = useCallback(() => {
    onImport(mappingFromTwilio(JSON.parse(data), workspaces, workflows));
    onClose();
  }, [data, onClose, onImport, workflows, workspaces]);

  const handleChange = useCallback((e, b) => {
    setData(e);
  }, []);

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={true}
      className={classes.root}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography>Flow Definition</Typography>
        {onClose && (
          <IconButton
            onClick={onClose}
            style={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey',
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers>
        <Alert severity="info" className={classes.alert}>
          <b>Import Flow JSON.</b> Your Studio Flow definition may reference other Twilio resources.
          These references are not automatically copied when the Flow is imported.
        </Alert>
        <Typography className={classes.guide}>Create a new flow based on an existing JSON Flow definition</Typography>
        <ReactAce
          mode="json"
          value={data}
          editorProps={{
            $blockScrolling: false,
          }}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={handleImport}>
          Import <ContentCopyIcon style={{ marginLeft: 5 }} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JsonDataView;
