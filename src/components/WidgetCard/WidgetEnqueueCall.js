import React, { memo, useCallback } from 'react';
import { Handle } from 'react-flow-renderer';

import {
  Card,
  CardHeader,
  CardContent,
  Tooltip,
  IconButton,
  Box
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  makeStyles
} from '@mui/styles';

import { enqueueCallWidget, getConnectorColorByType, activeEdgeColor } from '../WidgetLibrary/data';

const useStyles = makeStyles(() => ({
  root: {
    width: 290,
    boxSizing: 'border-box',
    height: 120,
    background: 'white',
    borderRadius: '0 !important',
    borderTop: '3px solid #276BF0',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    '&:focus': {
      border: '1px solid #276BF0'
    },
  },
  active: {
    borderLeft: '1px solid #276BF0 !important',
    borderRight: '1px solid #276BF0 !important',
    borderBottom: '1px solid #276BF0 !important'
  },
  headerTitle: {
    '& *': {
      lineHeight: 'unset !important'
    }
  },
  type: {
    color: 'gray !important',
    fontWeight: '400 !important'
  },
  header: {
    background: '#F9FBFF',
    height: 40,
    display: 'flex',
    padding: '0 !important',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '0.25px solid #CECFD5',
    boxSizing: 'border-box',
    fontFamily: 'Inter',
    '& span': {
      textAlign: 'center',
      fontWeight: 800,
      fontSize: 12,
    },
    '& .MuiCardHeader-action': {
      margin: 0,
      display: 'flex',
    }
  },
  tooltip: {
    position: 'absolute',
    background: '#4A4A4A',
    padding: 3,
    fontFamily: 'ABeeZee',
    fontSize: 12,
    fontWeight: 400,
    color: 'white',
    cursor: 'pointer',
    border: 0,
    '&:focus': {
      border: 0
    }
  },
  tooltipCallComplete: {
    top: '-25px',
    width: 90,
    cursor: 'pointer',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  tooltipFailedToEnqueue: {
    top: '-25px',
    width: 110,
    left: '50%',
    transform: 'translateX(-50%)'
  },
  tooltipCallFailed: {
    top: '-25px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 70
  },
  deleteWidget: {
    padding: '0 !important'
  },
  connectorDotContainer: {
    borderWidth: 1,
    width: 14,
    height: 14,
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    cursor: 'pointer !important'
  },
  connectorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    // zIndex: -10
  },
  workflow: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }

}));

export default memo((props) => {
  const { data, isConnectable, selected, type, id } = props;
  const classes = useStyles();
  const color = getConnectorColorByType(type);

  const bgColor = (index) => data.activeSource === enqueueCallWidget.sourceHandles[index] ? activeEdgeColor : data.transitions?.find((tran) => tran.sourceHandle === enqueueCallWidget.sourceHandles[index]) ? color : '#4A4A4A';
  return (
    <Card id={id} className={`${classes.root} widget-card ${selected ? classes.active : ''}`}>
      <div
        className={classes.connectorDot}
        style={{
          background: data.activeTarget === enqueueCallWidget.targetHandles[0] ? activeEdgeColor : '#555',
          top: 10,
          left: 7,
        }}
      ></div>
      <Handle
        type="target"
        position="left"
        id={enqueueCallWidget.targetHandles[0]}
        className={classes.connectorDotContainer}
        style={{
          borderColor: data.activeTarget === enqueueCallWidget.targetHandles[0] ? activeEdgeColor : '#555', top: 15, left: 5,
        }}
        isConnectable={isConnectable}
      />
      <CardHeader
        title={<Box className={classes.headerTitle}><Box>{data.label}</Box><Box className={classes.type}>({type})</Box></Box>}
        className={classes.header}
        action={(
          <>
            {!data.inputValid && <Tooltip placement="top" title="Missing required entry transition"><InfoIcon color="error" /></Tooltip>}
            {selected && <IconButton data-node-id={id} className={`${classes.deleteWidget} delete_widget`}><DeleteIcon style={{ cursor: 'pointer' }} /></IconButton>}
          </>
        )}
      />
      <CardContent className={classes.list}>
        {data.queueOrTaskRouter === 'queue' && `Enqueue: ${data.queueName}`}
        {data.queueOrTaskRouter === 'task_router' && (
          <Tooltip placement="top" title={data.taskRouterWorkflow?.value}>
            <Box className={classes.workflow}>Workflow: {data.taskRouterWorkflow?.value}</Box>
          </Tooltip>
        )}
      </CardContent>


      <div
        className={classes.connectorDot}
        style={{
          background: bgColor(0),
          bottom: -26,
          left: 45,
        }}
      ></div>
      <Handle
        type="source"
        position="bottom"
        id={enqueueCallWidget.sourceHandles[0]}
        className={classes.connectorDotContainer}
        style={{
          bottom: -28,
          borderColor: bgColor(0),
          left: 50,
        }}
        isConnectable={isConnectable}
      >
        <button
          data-node-id={id}
          data-source-handle={enqueueCallWidget.sourceHandles[0]}
          style={{ background: bgColor(0) }}
          className={`${classes.tooltipCallComplete} ${classes.tooltip}  source_handle`}
        >
          Call Complete
        </button>
      </Handle>
      <div
        className={classes.connectorDot}
        style={{
          background: bgColor(1),
          bottom: -26,
          left: 150
        }}
      ></div>
      <Handle
        type="source"
        position="bottom"
        id={enqueueCallWidget.sourceHandles[1]}
        className={classes.connectorDotContainer}
        style={{
          bottom: -28,
          borderColor: bgColor(1),
          left: 155,
        }}
        isConnectable={isConnectable}
      >
        <button
          data-node-id={id}
          data-source-handle={enqueueCallWidget.sourceHandles[1]}
          style={{ background: bgColor(1) }}
          className={`${classes.tooltipFailedToEnqueue} ${classes.tooltip}  source_handle`}
        >
          Failed to Enqueue
        </button>
      </Handle>
      <div
        className={classes.connectorDot}
        style={{
          background: bgColor(2),
          bottom: -26,
          left: 245,
        }}
      ></div>
      <Handle
        type="source"
        position="bottom"
        id={enqueueCallWidget.sourceHandles[2]}
        className={classes.connectorDotContainer}
        style={{
          bottom: -28,
          borderColor: bgColor(2),
          left: 250,
        }}
        isConnectable={isConnectable}
      >
        <button
          data-node-id={id}
          data-source-handle={enqueueCallWidget.sourceHandles[2]}
          style={{ background: bgColor(2) }}
          className={`${classes.tooltipCallFailed} ${classes.tooltip} source_handle`}
        >
          Call Failed
        </button>
      </Handle>
    </Card>

  );
});
