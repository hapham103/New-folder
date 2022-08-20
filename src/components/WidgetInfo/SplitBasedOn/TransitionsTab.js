/* eslint-disable default-case */
import produce from 'immer';
import React, { useCallback, useMemo } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Button,
  Autocomplete,
  TextField
} from '@mui/material';
import {
  makeStyles
} from '@mui/styles';
import { conditions, getWidgetByType } from '../../WidgetLibrary/data';
import { getTransitionIdFromData } from '../../../utils';

const useStyles = makeStyles(() => ({
  input: {
    margin: '5px 0 !important',
    background: 'white',
    borderRadius: 3
  },
  container: {
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
  },
  typoBtn: {
    cursor: 'pointer'
  },
  typoSmall: {
    fontSize: '12px !important'
  }
}));

let id = 2;
const getId = (nodeId) => `${nodeId}condition_${id++}`;

const ConfigTab = ({ nodes, editNode, setEditNode, setTransitions, switchToConfigTab, onSaveConfig }) => {
  const classes = useStyles();
  const transitions = useMemo(() => editNode.data.transitions || [], [editNode]);

  const handleChange = useCallback((value, outputId, prop) => {
    if (!value && !prop) {
      onSaveConfig(produce(editNode, draft => {
        draft.data.outputs = draft.data.outputs.filter((op) => op.id !== outputId);
      }));
      return;
    }
    switch (prop) {
      case 'transition':
        if (!value) {
          const newNode = produce(editNode, draft => {
            const outputIndex = draft.data.outputs?.findIndex((op) => op.id === outputId);
            if (outputIndex >= 0) {
              draft.data.outputs[outputIndex].tranId = null;
            }
          })
          setTransitions(newNode, undefined, outputId);
          break;
        }
        const targetNode = nodes.find((node) => node.id === value);
        const targetHandle = getWidgetByType(targetNode.type).targetHandles[0];
        const sourceConnectorColor = getWidgetByType(editNode.type).connectorColor;
        const newTran = {
          id: getTransitionIdFromData({ source: editNode.id, sourceHandle: outputId, target: value, targetHandle }),
          source: editNode.id,
          target: value,
          sourceHandle: outputId,
          targetHandle,
          type: 'custom',
          style: {
            strokeWidth: 3,
            stroke: sourceConnectorColor
          }
        }

        const newNode = produce(editNode, draft => {
          const outputIndex = draft.data.outputs?.findIndex((op) => op.id === outputId);
          if (outputIndex >= 0) {
            draft.data.outputs[outputIndex].tranId = newTran.id;
          }
        })
        setTransitions(newNode, newTran, outputId);
        break;
      case 'condition.type':
        setEditNode((prev) => produce(prev, draft => {
          const outputIndex = draft.data.outputs?.findIndex((op) => op.id === outputId);
          if (outputIndex >= 0) {
            draft.data.outputs[outputIndex].condition.type = value;
          }
        }));
        break;
      case 'condition.value':
        setEditNode((prev) => produce(prev, draft => {
          const outputIndex = draft.data.outputs?.findIndex((op) => op.id === outputId);
          if (outputIndex >= 0) {
            draft.data.outputs[outputIndex].condition.value = value;
          }
        }));
        break;
      default:

    }

  }, [editNode, nodes, onSaveConfig, setEditNode, setTransitions]);

  const handleAdd = useCallback(() => {
    onSaveConfig(produce(editNode, draft => {
      draft.data.outputs.push({
        id: `${draft.id}condition_${draft.data.outputs.length}`,
        event: 'match',
        condition: {
          type: conditions[0].value,
          value: ''
        }
      })
    }));
    setTimeout(() => {
      const configTab = document.getElementById('config-tab');
      if (!configTab) return;
      configTab.scrollTop = configTab.scrollHeight;
    });
  }, [editNode, onSaveConfig]);

  return (
    <Box maxHeight="100%" overFlow="auto">
      {!editNode.data.input ? (
        <Box width="100%" className={classes.container}>
          <Typography className={classes.typoSmall}>COMPARISON VALUE NOT SET</Typography>
          <Typography color="primary" className={classes.typoBtn} onClick={switchToConfigTab}>Set Value</Typography>
        </Box>
      ) : (
        <>
          <Box width="100%" className={classes.container}>
            <Typography className={classes.typoSmall}>COMPARING WITH</Typography>
            <Typography color="primary"><span>&#123;&#123;</span>{editNode.data.input}<span>&#125;&#125;</span></Typography>
            <Typography color="primary" className={classes.typoBtn} onClick={switchToConfigTab}>Change Value</Typography>
          </Box>
          <Box width="100%" className={classes.container}>
            <Box display="flex" justifyContent="space-between">
              <Typography className={classes.typoSmall}>NEW CONDITION</Typography>
              <Button color="primary" size="small" variant="outlined" onClick={handleAdd}>+</Button>
            </Box>
          </Box>
          {editNode.data.outputs?.map((output) => (
            <Box width="100%" className={classes.container} key={output.id}>
              <Typography>{output.event === 'noMatch' ? 'No matches' : output.condition.type} {output.id}</Typography>
              {output.event === 'match' && (
                <>
                  <Autocomplete
                    freeSolo
                    getOptionLabel={(option) => conditions.find((c) => c.value === option)?.label || ""}
                    disablePortal
                    fullWidth
                    size="small"
                    className={classes.input}
                    value={output.condition.type ?? conditions[0].value}
                    onChange={(e, v) => handleChange(v, output.id, 'condition.type')}
                    options={conditions.map((c) => c.value)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <TextField
                    fullWidth size="small"
                    className={classes.input}
                    variant="outlined"
                    value={output.condition.value || ''}
                    placeholder="Enter Value..."
                    onChange={(e) => handleChange(e.target.value, output.id, 'condition.value')}
                  />
                </>
              )}
              <FormControl fullWidth size="small" className={classes.input}>
                <Select
                  id={`${editNode.id}_${output.id}`}
                  value={transitions.find((tran) => tran.id === output.tranId)?.target ?? ''}
                  onChange={(e) => handleChange(e.target.value, output.id, 'transition')}
                >
                  {nodes.map((node) => (
                    <MenuItem
                      key={node.id}
                      value={node.id}
                      selected={transitions.find((tran) => tran.id === output.tranId)?.target === node.id}
                    >{node.data.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box display="flex" justifyContent="space-between">
                {transitions.find((tran) => tran.id === output.tranId)?.target ? (<Typography className={classes.disconnect} onClick={() => handleChange(undefined, output.id, 'transition')}>Disconnect</Typography>) : <Box></Box>}
                {output.event === 'match' && <Typography className={classes.disconnect} onClick={() => handleChange(undefined, output.id)}>Delete</Typography>}
              </Box>
            </Box>
          ))}
        </>
      )}
      <Box pb={2} />
    </Box>
  );
};

export default ConfigTab;
