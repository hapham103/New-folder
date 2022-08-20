/* eslint-disable default-case */
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import {
  TextField,
  Button,
  Tooltip,
  Switch,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider, Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Autocomplete
} from '@mui/material';
import {
  makeStyles
} from '@mui/styles';

const useStyles = makeStyles(() => ({
  input: {
    margin: '10px 0 !important',
    background: 'white',
    borderRadius: 3
  },
  list: {
    background: '#e6e6e6',
    width: 'calc(100% + 16px) !important',
    padding: '0 8px 15px 8px',
    boxSizing: 'border-box',
    marginTop: 10,
    marginLeft: -8,
    '& a': {
      textDecoration: 'none !important',
      cursor: 'pointer !important'
    }
  },
  typoBtn: {
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  tooltip: {
    color: 'inherit !important',
    background: 'white !important',
    boxShadow: '0px 4px 4px rgb(0 0 0 / 30%) !important',
    padding: '10px 15px !important'
  }
}));

let id = 0;
const getId = () => `${id++}`;

const ConfigTab = ({ editNode, setEditNode, nodes, saveConfig }) => {
  const classes = useStyles();

  const handleChange = useCallback((value, prop) => {
    switch (prop) {
      case 'input':
        saveConfig({
          ...editNode, data: { ...editNode.data, [prop]: value }
        });
        break;
      default:
        setEditNode((prev) => ({
          ...prev, data: { ...prev.data, [prop]: value }
        }));
        break;
    }
  }, [saveConfig, editNode, setEditNode]);

  const options = useMemo(() => {
    const opts = [
      { value: 'contact.channel.address' },
      { value: 'flow.channel.address' },
      { value: 'flow.data' },
      { value: 'flow.variables' },
      { value: 'flow.sid' },
      { value: 'flow.flow_sid' },
    ];
    nodes.forEach((node) => {
      switch (node.type) {
        case 'split_based_on':
          opts.push({ value: `widgets.${node.id}.Choice` });
          break;
        case 'gather_input_on_call':
          opts.push({ value: `widgets.${node.id}.Digits` });
          opts.push({ value: `widgets.${node.id}.SpeechResult` });
          break;
        case 'enqueue_call':
          opts.push({ value: `widgets.${node.id}.CallSid` });
          opts.push({ value: `widgets.${node.id}.AccountSid` });
          opts.push({ value: `widgets.${node.id}.From` });
          opts.push({ value: `widgets.${node.id}.To` });
          opts.push({ value: `widgets.${node.id}.CallStatus` });
          opts.push({ value: `widgets.${node.id}.ApiVersion` });
          opts.push({ value: `widgets.${node.id}.Direction` });
          opts.push({ value: `widgets.${node.id}.FowaredFrom` });
          opts.push({ value: `widgets.${node.id}.ParentCallSid` });
          opts.push({ value: `widgets.${node.id}.QueueResult` });
          opts.push({ value: `widgets.${node.id}.QueueSid` });
          opts.push({ value: `widgets.${node.id}.QueueTime` });
          break;
        case 'say_or_play':
          opts.push({ value: `widgets.${node.id}.language` });
          opts.push({ value: `widgets.${node.id}.void` });
          break;
        case 'make_http_request':
          opts.push({ value: `widgets.${node.id}.body` });
          opts.push({ value: `widgets.${node.id}.content_type` });
          opts.push({ value: `widgets.${node.id}.status_code` });
          opts.push({ value: `widgets.${node.id}.parsed` });
          break;
      }
    });
    return opts;
  }, [nodes]);

  return (
    <Box maxHeight="100%" overFlow="auto">
      <TextField
        fullWidth size="small"
        className={classes.input}
        label={<Box>WIDGET NAME <Typography color="error" style={{ display: 'inline-block' }}>*</Typography></Box>}
        variant="outlined"
        value={editNode.data.label}
        onChange={(e) => handleChange(e.target.value, 'label')}
      />
      <Autocomplete
        freeSolo
        getOptionLabel={(option) => option || ""}
        disablePortal
        fullWidth
        size="small"
        className={classes.input}
        value={editNode.data.input || ''}
        onChange={(e, v) => handleChange(v, 'input')}
        options={options.map(opt => opt.value)}
        renderInput={(params) => <TextField {...params} label={<Box>VARIABLE TO TEST <Typography color="error" style={{ display: 'inline-block' }}>*</Typography></Box>} />}
      />
      <Box pb={2} />
    </Box>
  );
};

export default ConfigTab;
