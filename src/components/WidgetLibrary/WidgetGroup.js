import React, { useState, useCallback } from 'react';
import {
  Collapse,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import {
  makeStyles
} from '@mui/styles';

import { ExpandMoreIcon } from '../icons/index';
import WidgetItem from './WidgetItem';

const useStyles = makeStyles(() => ({
  header: {
    cursor: 'pointer'
  },
  title: {
    fontWeight: '500 !important',
    fontSize: '16px !important',
    lineHeight: '19px !important',
    display: 'flex',
    alignItems: 'center'
  }
}));

const WidgetList = ({ name, icon, items, onDragStart }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <Box>
      <Box display="flex" height="42px" onClick={handleExpandClick} alignItems="center" className={classes.header}>
        {icon}
        <ExpandMoreIcon
          expand={expanded}
        />
        <Typography className={classes.title}>{name}</Typography>
      </Box>
      <Collapse in={expanded}>
        {items.map((item) => <WidgetItem key={item.name} {...item} onDragStart={onDragStart} />)}
      </Collapse>
    </Box>
  );
};

export default WidgetList;
