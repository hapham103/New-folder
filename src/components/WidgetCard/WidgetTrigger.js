import React, { memo, useCallback } from 'react';
import { Handle } from 'react-flow-renderer';

import {
  Card,
  Box,
  Typography,
  Tooltip,
  IconButton
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';

import {
  makeStyles
} from '@mui/styles';

import { triggerWidget, getConnectorColorByType } from '../WidgetLibrary/data';

const useStyles = makeStyles(() => ({
  root: {
    width: 643,
    boxSizing: 'border-box',
    height: 78,
    background: 'white',
    borderRadius: '0 !important',
    borderTop: '8px solid #276BF0',
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
  header: {
    height: 50,
    display: 'flex',
    padding: '0 !important',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    fontFamily: 'Inter',
    '& p': {
      color: '#276BF0',
      fontWeight: '500 !important'
    },
  },
  tooltip: {
    position: 'absolute',
    background: '#276BF0 !important',
    padding: 3,
    fontFamily: 'ABeeZee',
    fontSize: 10,
    fontWeight: 400,
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    border: 0,
    '&:focus': {
      border: 0
    }
  },
  tooltipIncommingMessage: {
    top: '-35px',
    left: '-9px',
    width: 149,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tooltipIncommingCall: {
    top: '-35px',
    left: '-7px',
    width: 125,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tooltipIncommingConversation: {
    top: '-35px',
    left: '-5px',
    width: 165,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tooltipIncommingRestApi: {
    top: '-35px',
    left: '-6px',
    width: 90,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tooltipIncommingSubFlow: {
    top: '-35px',
    left: '-6px',
    width: 90,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tooltipCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
    border: '1px solid white'
  },
  tooltipInfoIcon: {
    color: 'white',
    width: '0.9rem !important',
    marginLeft: 5
  },
 
  connectorDotContainer: {
    border: '1px solid #276BF0',
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
    background: '#276BF0'
  }
}));

export default memo((props) => {
  const { data, isConnectable, selected, type, id } = props;
  const classes = useStyles();
  const color = getConnectorColorByType(type);
  return (
    <Card id={id} className={`${classes.root} widget-card ${selected ? classes.active : ''}`}>
      <Box className={classes.header}>
        <Box></Box>
        <Typography color="error">{data.label}</Typography>
        <SettingsIcon style={{ marginTop: -25 }}/>
      </Box>

      <div
        className={classes.connectorDot}
        style={{
          bottom: -30,
          left: 15,
        }}
      ></div>
      <Handle
        type="source"
        position="bottom"
        id={triggerWidget.sourceHandles[0]}
        className={classes.connectorDotContainer}
        style={{
          bottom: -32,
          left: 20,
        }}
        isConnectable={isConnectable}
      >
        <button
          className={`${classes.tooltipIncommingMessage} ${classes.tooltip}`}
        >
          <span className={classes.tooltipCircle} />Incomming Message<HelpCenterOutlinedIcon classes={{ root: classes.tooltipInfoIcon }} />
        </button>
      </Handle>

      <div
        className={classes.connectorDot}
        style={{
          bottom: -30,
          left: 165,
        }}
      ></div>
      <Handle
        type="source"
        position="bottom"
        id={triggerWidget.sourceHandles[1]}
        className={classes.connectorDotContainer}
        style={{
          bottom: -32,
          left: 170,
        }}
        isConnectable={isConnectable}
      >
        <button
          className={`${classes.tooltipIncommingCall} ${classes.tooltip}`}
        >
          <span className={classes.tooltipCircle} />Incomming Call<HelpCenterOutlinedIcon classes={{ root: classes.tooltipInfoIcon }} />
        </button>
      </Handle>

      <div
        className={classes.connectorDot}
        style={{
          bottom: -30,
          left: 291,
        }}
      ></div>
      <Handle
        type="source"
        position="bottom"
        id={triggerWidget.sourceHandles[2]}
        className={classes.connectorDotContainer}
        style={{
          bottom: -32,
          left: 296,
        }}
        isConnectable={isConnectable}
      >
        <button
          className={`${classes.tooltipIncommingConversation} ${classes.tooltip}`}
        >
          <span className={classes.tooltipCircle} />Incomming Conversation<HelpCenterOutlinedIcon classes={{ root: classes.tooltipInfoIcon }} />
        </button>
      </Handle>

      <div
        className={classes.connectorDot}
        style={{
          bottom: -30,
          left: 460,
        }}
      ></div>
      <Handle
        type="source"
        position="bottom"
        id={triggerWidget.sourceHandles[3]}
        className={classes.connectorDotContainer}
        style={{
          bottom: -32,
          left: 465,
        }}
        isConnectable={isConnectable}
      >
        <button
          className={`${classes.tooltipIncommingRestApi} ${classes.tooltip}`}
        >
          <span className={classes.tooltipCircle} />REST API<HelpCenterOutlinedIcon classes={{ root: classes.tooltipInfoIcon }} />
        </button>
      </Handle>
      <div
        className={classes.connectorDot}
        style={{
          bottom: -30,
          left: 554,
        }}
      ></div>
      <Handle
        type="source"
        position="bottom"
        id={triggerWidget.sourceHandles[4]}
        className={classes.connectorDotContainer}
        style={{
          bottom: -32,
          left: 559,
        }}
        isConnectable={isConnectable}
      >
        <button
          className={`${classes.tooltipIncommingSubFlow} ${classes.tooltip}`}
        >
          <span className={classes.tooltipCircle} />Subflow<HelpCenterOutlinedIcon classes={{ root: classes.tooltipInfoIcon }} />
        </button>
      </Handle>
    </Card>

  );
});
