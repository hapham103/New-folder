/* eslint-disable default-case */
import React, { useCallback, useMemo } from 'react';
import {
  MarkerType
} from 'react-flow-renderer';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import {
  makeStyles
} from '@mui/styles';
import { makeHttpRequestWidget, getWidgetByType } from '../../WidgetLibrary/data';
import { getTransitionIdFromData } from '../../../utils';

const useStyles = makeStyles(() => ({
  input: {
    background: 'white',
    borderRadius: 3
  },
  advancedSeechSettings: {
    margin: '10px 0 10px -8px !important',
    padding: '8px !important',
    background: '#e6e6e6',
    width: 'calc(100% + 16px) !important',
    boxSizing: 'border-box'
  },
  disconnect: {
    color: 'red',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'under-line'
    }
  }
}));

const sourceHandles = makeHttpRequestWidget.sourceHandles;

const ConfigTab = ({ nodes, editNode, setTransitions }) => {
  const transitions = useMemo(() => editNode.data.transitions || [], [editNode]);
  const classes = useStyles();
  const handleChange = useCallback((target, sourceHandle) => {
    if (!target) {
      setTransitions(editNode, undefined, sourceHandle);
      return;
    }
    const targetNode = nodes.find((node) => node.id === target);
    const targetHandle = getWidgetByType(targetNode.type).targetHandles[0];
    const sourceConnectorColor = getWidgetByType(editNode.type).connectorColor;
    const newTran = {
      id: getTransitionIdFromData({ source: editNode.id, sourceHandle, target, targetHandle }),
      source: editNode.id,
      target,
      sourceHandle,
      targetHandle,
      type: 'custom',
      style: {
        strokeWidth: 3,
        stroke: sourceConnectorColor
      }
    }
    setTransitions(editNode, newTran, sourceHandle);
  }, [editNode, nodes, setTransitions]);

  return (
    <Box maxHeight="100%" overFlow="auto">
      {sourceHandles.map((sourceHandle) => {
        const transition = transitions?.find((tran) => tran.sourceHandle === sourceHandle);
        return (
          <Box key={`${editNode.id}_${sourceHandle}`} width="100%" className={classes.advancedSeechSettings}>
            <FormControl fullWidth size="small" className={classes.input}>
              <InputLabel id={`${editNode.id}_${sourceHandle}_label`}>{sourceHandle}</InputLabel>
              <Select
                id={`${editNode.id}_${sourceHandle}`}
                value={transition?.target ?? ''}
                onChange={(e) => handleChange(e.target.value, sourceHandle)}
              >
                {nodes.map((node) => (
                  <MenuItem
                    key={`${editNode.id}_${sourceHandle}_${node.id}`}
                    value={node.id}
                    selected={transition?.target === node.id}
                  >{node.data.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {transition?.target && (
              <Typography className={classes.disconnect} onClick={() => handleChange(undefined, sourceHandle)}>Disconnect</Typography>
            )}
          </Box>
        );
      })}
      <Box pb={2} />
    </Box>
  );
};

export default ConfigTab;
