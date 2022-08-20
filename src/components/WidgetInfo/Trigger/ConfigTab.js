/* eslint-disable default-case */
import React, { useCallback, useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Link,
  Switch,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider, Typography
} from '@mui/material';
import {
  makeStyles
} from '@mui/styles';

import { ExpandMoreIcon } from '../../icons/index';

const useStyles = makeStyles(() => ({
  input: {
    margin: '10px 0 !important',
    background: 'white',
    borderRadius: 3
  },
  stopGateringInput: {
    width: 160
  },
  seconds: {
    marginLeft: 5,
    fontSize: 11
  },
  stopGatheringOnKeyPressLabel: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 12
  },
  advancedFeatures: {
    background: '#e6e6e6',
    width: 'calc(100% + 16px) !important',
    padding: '0 8px 15px 16px',
    boxSizing: 'border-box',
    marginTop: 10,
    marginLeft: -8,
    '& a': {
      textDecoration: 'none !important',
      cursor: 'pointer !important'
    }
  },
}));

const ConfigTab = ({ editNode, setEditNode, onShowFlowJson = () => {} }) => {
  const classes = useStyles();
  const [openAdvancedFeatures, setOpenAdvancedFeatures] = React.useState(false);
  const handleClickAdvancedFeatures = useCallback(() => {
    setOpenAdvancedFeatures((prev) => !prev);
  }, []);
  const handleChange = useCallback((value, prop) => {
    switch (prop) {
      case 'testUsers':
        setEditNode((prev) => ({
          ...prev, data: { ...prev.data, [prop]: value.split(',').map((item) => item.trim()) }
        }));
        break;
      default:
        setEditNode((prev) => ({
          ...prev, data: { ...prev.data, [prop]: value }
        }));
        break;
    }
  }, [setEditNode]);
  return (
    <Box maxHeight="100%" overFlow="auto">
      <TextField
        fullWidth size="small"
        className={classes.input}
        label="FLOW NAME"
        variant="outlined"
        value={editNode.data.label}
        onChange={(e) => handleChange(e.target.value, 'label')}
      />
      <TextField
        fullWidth size="small"
        className={classes.input}
        label="REST API URL"
        variant="outlined"
        value={editNode.data.restApiUrl}
        onChange={(e) => handleChange(e.target.value, 'restApiUrl')}
      />
      <TextField
        fullWidth size="small"
        className={classes.input}
        label="WEBHOOK URL"
        variant="outlined"
        value={editNode.data.webhookUrl}
        onChange={(e) => handleChange(e.target.value, 'webhookUrl')}
      />
      <TextField
        fullWidth size="small" className={classes.input}
        label={<>TEST USERS <Typography color="error" style={{ display: 'inline-block' }}>*</Typography></>}
        multiline
        rows={4}
        value={editNode.data.testUsers?.join(',') ?? ''}
        inputProps={{
          placeholder: 'Add phone numbers (separated by commas) to test the latest draft of this flow'
        }}
        onChange={(e) => handleChange(e.target.value, 'testUsers')}
      />
      <Button variant="outlined" color="primary" style={{ width: '100%' }} onClick={onShowFlowJson}>
        Show Flow JSON
      </Button>
      <Box width="100%" className={classes.advancedFeatures}>
        <ListItemButton onClick={handleClickAdvancedFeatures}>
          <ListItemText primary="ADVANCED FEATURES" />
          <ExpandMoreIcon
            expand={openAdvancedFeatures}
          />
        </ListItemButton>
        <Collapse in={openAdvancedFeatures} timeout="auto" unmountOnExit>
          <Divider style={{ marginBottom: 10 }} />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">CONCURRENT CALLS TRIGGERS</Typography>
            <Link to="">Docs</Link>
          </Box>
          <Switch checked={editNode.data.concurrentCallsTrigger ?? true} onChange={(e) => handleChange(e.target.checked, 'concurrentCallsTrigger')} size="small" />
          <br/>
          <Typography variant="body2">
            This feature allows concurrent inbound calls from the same phone number.
            This disables the Send & Wait for Reply widget if connected to the
            Incoming Call trigger because if the phone number is the same or unknown,
            messages with replies cannot be handled by the flow.
          </Typography>
          <br/>
          <Typography variant="body2">
            You should only disable this setting when you have a flow that only has callers with unique Caller IDs.
          </Typography>
          <br/>
          <Link to="">Visit the docs for more information.</Link>
        </Collapse>
      </Box>
      <Box pb={2} />
    </Box>
  );
};

export default ConfigTab;
