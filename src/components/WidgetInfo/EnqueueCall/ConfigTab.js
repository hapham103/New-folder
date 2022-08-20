/* eslint-disable default-case */
import React, { useCallback, useState, useEffect } from 'react';
import {
  TextField,
  Select,
  Autocomplete,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  Typography,
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
  timeoutInput: {
    width: 160
  },
  seconds: {
    marginLeft: 5,
    fontSize: 11
  },
}));

const ConfigTab = ({ editNode, setEditNode, workflows, workspaces }) => {
  console.log(workflows, workspaces);
  const classes = useStyles();
  const handleChange = useCallback((value, prop) => {
    switch (prop) {
      case 'queueName':
        setEditNode((prev) => ({
          ...prev, data: { ...prev.data, [prop]: value, queueOrTaskRouter: 'queue' }
        }));
        break;
      case 'taskRouterWorkspace': case 'taskRouterWorkflow': case 'taskAttributes':
        setEditNode((prev) => ({
          ...prev, data: { ...prev.data, [prop]: value, queueOrTaskRouter: 'task_router' }
        }));
        break;
      case 'priority':
        setEditNode((prev) => ({
          ...prev, data: { ...prev.data, [prop]: parseInt(value, 10), queueOrTaskRouter: 'task_router' }
        }));
        break;
      case 'timeout':
        setEditNode((prev) => ({
          ...prev, data: { ...prev.data, [prop]: parseInt(value, 10) }
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
        label="WIDGET NAME"
        variant="outlined"
        value={editNode.data.label}
        onChange={(e) => handleChange(e.target.value, 'label')}
      />
      <Box sx={{ minWidth: '100%' }}>
        <FormControl fullWidth size="small" className={classes.input}>
          <InputLabel>QUEUE OR TASKROUTER <Typography color="error" style={{ display: 'inline-block' }}>*</Typography></InputLabel>
          <Select
            labelId="enqueue_or_task_router"
            value={editNode.data.queueOrTaskRouter ?? 'task_router'}
            label="QUEUE OR TASKROUTER"
            onChange={(e) => handleChange(e.target.value, 'queueOrTaskRouter')}
          >
            <MenuItem value="task_router">TaskRouter</MenuItem>
            <MenuItem value="queue">Queue</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {(editNode.data.queueOrTaskRouter === 'task_router' || !editNode.data.queueOrTaskRouter) && (
        <>
          <Autocomplete
            freeSolo
            getOptionLabel={(option) => option.label || ""}
            disablePortal
            fullWidth
            size="small"
            className={classes.input}
            value={editNode.data.taskRouterWorkspace || ''}
            onChange={(e, v) => handleChange(v, 'taskRouterWorkspace')}
            options={workspaces.map((ws) => ({ label: ws.friendly_name, value: ws.sid }))}
            renderInput={(params) => <TextField {...params} label="TASK ROUTER WORKSPACE" />}
          />
          <Autocomplete
            freeSolo
            getOptionLabel={(option) => option.label || ""}
            disablePortal
            fullWidth
            size="small"
            className={classes.input}
            value={editNode.data.taskRouterWorkflow || ''}
            onChange={(e, v) => handleChange(v, 'taskRouterWorkflow')}
            options={workflows.filter((wf) => wf.workspaceSid === editNode.data.taskRouterWorkspace?.value)?.map((wf) => ({ label: wf.friendlyName, value: wf.sid }))}
            renderInput={(params) => <TextField {...params} label="TASK ROUTER WORKFLOW" />}
          />
          <TextField
            fullWidth size="small" className={classes.input}
            label="TASK ATTRIBUTES (JSON)"
            multiline
            rows={2}
            value={editNode.data.taskAttributes ?? ''}
            onChange={(e) => handleChange(e.target.value, 'taskAttributes')}
          />
          <TextField
            fullWidth size="small" className={classes.input}
            label="PRIORITY"
            inputProps={{
              type: 'number',
              step: 1,
            }}
            value={editNode.data.priority}
            onChange={(e) => handleChange(e.target.value, 'priority')}
          />
          <Box width="100%" display="flex" alignItems="center">
            <TextField
              size="small" className={`${classes.input} ${classes.timeoutInput}`}
              label="TIMEOUT"
              inputProps={{
                type: 'number',
                step: 1,
                min: 0
              }}
              value={editNode.data.timeout ?? 0}
              onChange={(e) => handleChange(e.target.value, 'timeout')}
            />
            <span className={classes.seconds}>SECONDS</span>
          </Box>
        </>
      )}
      {editNode.data.queueOrTaskRouter === 'queue' && (
        <TextField
          fullWidth size="small" className={classes.input}
          label="QUEUE NAME"
          value={editNode.data.queueName ?? ''}
          onChange={(e) => handleChange(e.target.value, 'queueName')}
        />
      )}

      <TextField
        fullWidth size="small" className={classes.input}
        label="HOLD MUSIC TWIML URL"
        value={editNode.data.holdMusicTwimlUrl ?? ''}
        onChange={(e) => handleChange(e.target.value, 'holdMusicTwimlUrl')}
      />
      <Box sx={{ minWidth: '100%' }}>
        <FormControl fullWidth size="small" className={classes.input}>
          <InputLabel>TWIML REQUEST METHOD</InputLabel>
          <Select
            value={editNode.data.twimlRequestMethod ?? 'GET'}
            label="TWIML REQUEST METHOD"
            onChange={(e) => handleChange(e.target.value, 'twimlRequestMethod')}
          >
            <MenuItem value="GET">GET</MenuItem>
            <MenuItem value="POST">POST</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box pb={2} />
    </Box>
  );
};

export default ConfigTab;
