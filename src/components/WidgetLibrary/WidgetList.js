import React, { useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import {
  Collapse,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import {
  makeStyles
} from '@mui/styles';
import {
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

import WidgetItem from './WidgetItem';
console.log('WidgetItem', WidgetItem);


const useStyles = makeStyles(() => ({

}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const WidgetList = ({ listName, icon, items, onDragStart }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography>{listName}</Typography>
        </Box>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {items.map((item) => <WidgetItem key={item.name} {...item} onDragStart={onDragStart} />)}
      </Collapse>
    </Box>
  );
};

export default WidgetList;
