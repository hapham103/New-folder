import React, { useCallback, useMemo } from 'react';
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
import 'ace-builds/src-noconflict/mode-json'

import { mappingToTwilio } from './mappingToTwilio';

const useStyles = makeStyles(() => ({
  root: {
    '& #ace-editor': {
      width: '100% !important'
    }
  },
  alert: {
    borderBottom: '2px solid rgb(2, 99, 224)'
  },

}));

const JsonDataView = ({ jsonData, onClose }) => {
  const classes = useStyles();
  const data = useMemo(() => mappingToTwilio(jsonData.nodes), [jsonData]);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(data))
  }, [data]);

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
          <b>Export or edit Flow JSON.</b>
          Your Studio Flow may reference other Twilio resources scoped to your particular account.
          The Flow will reload after saving your changes.
        </Alert>
        <ReactAce
          mode="json"
          value={JSON.stringify(data, null, 2)}
          editorProps={{
            $blockScrolling: false,
          }} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={handleCopy}>
          Copy <ContentCopyIcon style={{ marginLeft: 5 }} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JsonDataView;
