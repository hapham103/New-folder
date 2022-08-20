import React, { memo, useCallback, useState, useMemo, useEffect } from 'react';
import { Handle } from 'react-flow-renderer';

import {
  Card,
  CardHeader,
  CardContent,
  Tooltip,
  IconButton,
  Box,
  Button,
  Menu,
  MenuItem,
  Divider,
  Typography
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  makeStyles
} from '@mui/styles';

import { splitBasedOnWidget, getConnectorColorByType, activeEdgeColor } from '../WidgetLibrary/data';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 258,
    // width: 'fit-content !important',
    boxSizing: 'border-box',
    height: 143,
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
    background: '#4A4A4A',
    padding: 3,
    fontFamily: 'ABeeZee',
    fontSize: 12,
    fontWeight: 400,
    color: 'white',
    cursor: 'pointer',
    border: 0,
    whiteSpace: 'nowrap',
    '&:focus': {
      border: 0
    }
  },
  deleteWidget: {
    padding: '0 !important'
  },
  connectorDotContainer: {
    borderWidth: 1,
    width: 14,
    height: 14,
    background: 'transparent',
    boxSizing: 'border-box',
    cursor: 'pointer !important',
    bottom: -18,
    left: '50%',
    transform: 'translateX(-50%)'
  },
  connectorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: -16,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  output: {
    position: 'absolute',
    marginTop: 10,
    paddingRight: '5px',
    display: 'flex',
    bottom: -10
  },
  new: {
    borderRadius: '10px !important',
    minWidth: 'unset !important',
    height: 21,
    marginLeft: '25px !important'
  }
}));

export default memo((props) => {
  const { data, isConnectable, selected, type, id } = props;
  const classes = useStyles();
  const color = getConnectorColorByType(type);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = React.useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, [setAnchorEl]);
  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);
  const handleNewCondition = React.useCallback(() => {
    setAnchorEl(null);
    data.newCondition(id);
  }, [data, id]);

  useEffect(() => {
    if (!selected) {
      document.getElementById(`fake-btn-${id}`)?.click();
    }
  }, [id, selected]);

  const bgColor = useCallback((index) => {
    const outputTran = data.transitions?.find((tran) => tran.id === data.outputs[index].tranId);
    if (!outputTran) return '#4A4A4A';
    if (outputTran.sourceHandle === data.activeSource) return activeEdgeColor;
    return color;
  }, [color, data.activeSource, data.outputs, data.transitions]);

  const [width, setWidth] = useState(document.getElementById('output-container')?.clientWidth || 258);

  useEffect(() => {
    const outputContainer = document.getElementById('output-container');
    setWidth(outputContainer?.clientWidth || 258);
  }, [data.outputs]);

  return (
    <Card id={id} style={{ width }} className={`${classes.root} widget-card ${selected ? classes.active : ''}`}>
      <div
        className={classes.connectorDot}
        style={{
          background: data.activeTarget === splitBasedOnWidget.targetHandles[0] ? activeEdgeColor : '#555',
          top: 12,
          left: 10,
        }}
      ></div>
      <Handle
        type="target"
        position="left"
        id={splitBasedOnWidget.targetHandles[0]}
        className={classes.connectorDotContainer}
        style={{
          borderColor: data.activeTarget === splitBasedOnWidget.targetHandles[0] ? activeEdgeColor : '#555', top: 10, left: 10,
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
        <span>&#123;&#123;</span>{data.input}<span>&#125;&#125;</span>
      </CardContent>

      <Box className={classes.output} id="output-container">
        {data.outputs.map((output, index) => (
          <Box position="relative" ml="5px" key={output.id}>
            <button
              data-node-id={id}
              data-source-handle={output.id}
              style={{ background: bgColor(index) }}
              className={`${classes.tooltip}  source_handle`}
            >
              {output.label || `${output.condition?.type} ${output.condition?.value}`}
            </button>
            <div
              className={classes.connectorDot}
              style={{
                background: bgColor(index),
              }}
            ></div>
            <Handle
              type="source"
              position="bottom"
              id={output.id}
              className={classes.connectorDotContainer}
              style={{
                borderColor: bgColor(index),
              }}
              isConnectable={isConnectable}
            />
          </Box>
        ))}
        <Button
          color="error"
          id="demo-customized-button"
          aria-controls={Boolean(anchorEl) ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          size="small"
          className={classes.new}
        >
          New
        </Button>
        <Menu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Typography textAlign="center">Transition on</Typography>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleNewCondition}>
            <Typography color="primary">Condition matches</Typography>
          </MenuItem>
        </Menu>
      </Box>
      <button style={{ display: 'none' }} id={`fake-btn-${id}`} data-node-id={id} className="fake-btn-check-split"></button>
    </Card>
  );
});
