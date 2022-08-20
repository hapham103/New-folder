import React, { useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Button
} from '@mui/material';
import {
  makeStyles
} from '@mui/styles';

import { widgetGroups } from './data';
import WidgetGroup from './WidgetGroup';

const useStyles = makeStyles(() => ({
  root: {
    width: 252,
    background: 'white',
    borderTop: '3px solid #0A125D',
    borderRadius: '0 !important',
    maxHeight: '100%',
    overflow: 'auto'
  },
  header: {
    background: '#F9FBFF',
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '0.25px solid #CECFD5',
    boxSizing: 'border-box',
    fontFamily: 'Inter',
    '& span': {
      textAlign: 'center',
      fontWeight: 800,
      fontSize: 12,
      lineHeight: 15
    }
  },
  list: {
    height: 'calc(100% - 33px)',
    boxSizing: 'border-box',
    background: '#f6f6f6'
  }
}));


const WidgetLibrary = ({
  onImportJsonFlow
}) => {
  const classes = useStyles();

  const onDragStart = useCallback((event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  return (
    <Card className={classes.root}>
      <CardHeader
        title="WIDGET LIBRARY"
        className={classes.header}
      />
      <CardContent className={classes.list}>
        <Button variant="outlined" color="primary" style={{ width: '100%' }} onClick={onImportJsonFlow}>
          Import Flow from Novel CX JSON
        </Button>
        {widgetGroups.map((widgetGroup) => (
          <WidgetGroup {...widgetGroup} key={widgetGroup.name} onDragStart={onDragStart} />
        ))}
      </CardContent>
    </Card>
  );
};

export default WidgetLibrary;
