import React, { useState, useCallback } from 'react';
import {
  Typography,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  makeStyles
} from '@mui/styles';

const useStyles = makeStyles(() => ({
}));

const ConfirmBox = ({ description, confirmAction, cancelAction }) => {
  const [open, setOpen] = useState(true);
  const onClose = useCallback(() => setOpen(false), []);

  const onCancel = useCallback(() => {
    cancelAction();
    onClose();
  }, [cancelAction, onClose]);
  const onConfirm = useCallback(() => {
    confirmAction();
    onClose();
  }, [confirmAction, onClose]);

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
      </DialogTitle>
      <DialogContent>
        {description}
      </DialogContent>
      <DialogActions>
        <Button size="small" variant="contained" color="inherit" onClick={onCancel}>
          No
        </Button>
        <Button size="small" variant="contained" color="primary" onClick={onConfirm}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmBox;
