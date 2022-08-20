import React, { useCallback } from 'react';
import {
  Typography,
  MenuItem,
} from '@mui/material';
import {
  makeStyles
} from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)'
    },
    cursor: 'pointer',
    height: 32,
    boxSizing: 'border-box',
    padding: '0',
    paddingLeft: 48,
    fontFamily: '"ABeeZee"',
    fontSize: '12px',
    lineHeight: '14px',
    display: 'flex',
    alignItems: 'center',
  }
}));

const WidgetItem = ({ name, type, onDragStart }) => {
  const classes = useStyles();
  const handleDragStart = useCallback((e) => {
    onDragStart(e, type);
  }, [onDragStart, type]);

  return (
    <div className={classes.root} draggable onDragStart={handleDragStart}>
      {name}
    </div>
  );
};

export default WidgetItem;
