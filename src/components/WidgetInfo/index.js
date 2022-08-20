import React, { useState, useCallback, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Tabs,
  Tab,
  Button
} from '@mui/material';
import {
  makeStyles
} from '@mui/styles';
import GatherInputOnCallConfig from './GatherInputOnCall/ConfigTab';
import TriggerConfig from './Trigger/ConfigTab';
import SetVariablesConfig from './SetVariables/ConfigTab';
import SayOrPlayConfig from './SayOrPlay/ConfigTab';
import EnqueueCallConfig from './EnqueueCall/ConfigTab';
import MakeHttpRequestConfig from './MakeHttpRequest/ConfigTab';
import SplitBasedOnConfig from './SplitBasedOn/ConfigTab';

import GatherInputOnCallTransitions from './GatherInputOnCall/TransitionsTab';
import TriggerTransitions from './Trigger/TransitionsTab';
import SetVariablesTransitions from './SetVariables/TransitionsTab';
import SayOrPlayTransitions from './SayOrPlay/TransitionsTab';
import EnqueueCallTransitions from './EnqueueCall/TransitionsTab';
import MakeHttpRequestTransitions from './MakeHttpRequest/TransitionsTab';
import SplitBasedOnTransitions from './SplitBasedOn/TransitionsTab';

const useStyles = makeStyles(() => ({
  root: {
    width: 252,
    background: 'white',
    borderTop: '3px solid #0A125D',
    borderRadius: '0 !important',
    maxHeight: '100%',
    overflow: 'auto',
    '& input, & textarea, &select': {
      background: 'white'
    }
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
  contentTab: {
    height: 381,
    overflow: 'auto',
    background: '#f6f6f6',
    boxSizing: 'border-box'
  },
  tabs: {
    display: 'flex',
    minHeight: 'unset !important',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px',
    width: '252px',
    height: '28px',
    background: '#F9FBFF',
    borderBottom: '0.25px solid #276BF0'
  },
  tab: {
    padding: '0 !important',
    minHeight: 'unset !important',
    height: '28px'
  },
  actions: {
    dislpay: 'felx',
    justifyContent: 'end',
    background: '#f6f6f6',
    borderTop: '1px solid #ccc'
  }
}));

const WidgetInfo = ({
  nodes,
  activeNode,
  onSaveConfig = () => { },
  onSaveTransitions = () => { },
  onDeleteWidget = () => { },
  onShowFlowJson = () => { },
  workflows,
  workspaces
}) => {
  const [editNode, setEditNode] = useState(activeNode);
  useEffect(() => setEditNode(activeNode), [activeNode]);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => setValue(0), [activeNode.id]);

  const handleChange = (event, newValue) => {
    onSaveConfig(editNode);
    setValue(newValue);
  };

  const handleSaveConfig = useCallback(() => {
    onSaveConfig(editNode);
  }, [onSaveConfig, editNode]);

  const handleSaveTransitions = useCallback((newNode, newEdge, sourceHandle) => {
    onSaveTransitions(newNode, newEdge, sourceHandle);
  }, [onSaveTransitions])

  return (
    <Card className={classes.root}>
      <CardHeader
        title={activeNode.data.label}
        className={classes.header}
      />
      <Tabs className={classes.tabs} value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab className={classes.tab} label="Config" />
        <Tab className={classes.tab} label="Transitions" id="transition-tab" />
      </Tabs>
      <CardContent id="config-tab" className={classes.contentTab}>
        {value === 0 && editNode && (
          <>
            {editNode.type === 'trigger' && (
              <TriggerConfig editNode={editNode} setEditNode={setEditNode} onShowFlowJson={onShowFlowJson} />
            )}
            {editNode.type === 'gather_input_on_call' && (
              <GatherInputOnCallConfig editNode={editNode} setEditNode={setEditNode} />
            )}
            {editNode.type === 'set_variables' && (
              <SetVariablesConfig editNode={editNode} setEditNode={setEditNode} />
            )}
            {editNode.type === 'say_or_play' && (
              <SayOrPlayConfig editNode={editNode} setEditNode={setEditNode} />
            )}
            {editNode.type === 'enqueue_call' && (
              <EnqueueCallConfig editNode={editNode} setEditNode={setEditNode} workflows={workflows} workspaces={workspaces} />
            )}
            {editNode.type === 'make_http_request' && (
              <MakeHttpRequestConfig editNode={editNode} setEditNode={setEditNode} />
            )}
            {editNode.type === 'split_based_on' && (
              <SplitBasedOnConfig editNode={editNode} setEditNode={setEditNode} nodes={nodes} saveConfig={onSaveConfig} />
            )}
          </>
        )}
        {value === 1 && (
          <>
            {editNode.type === 'trigger' && (
              <TriggerTransitions
                nodes={nodes.filter((node) => node.id !== activeNode.id)}
                setTransitions={handleSaveTransitions}
                editNode={editNode}
              />
            )}
            {editNode.type === 'gather_input_on_call' && (
              <GatherInputOnCallTransitions
                nodes={nodes.filter((node) => node.type !== 'trigger')}
                setTransitions={handleSaveTransitions}
                editNode={editNode}
              />
            )}

            {editNode.type === 'set_variables' && (
              <SetVariablesTransitions
                nodes={nodes.filter((node) => node.type !== 'trigger')}
                setTransitions={handleSaveTransitions}
                editNode={editNode}
              />
            )}
            {editNode.type === 'say_or_play' && (
              <SayOrPlayTransitions
                nodes={nodes.filter((node) => node.type !== 'trigger')}
                setTransitions={handleSaveTransitions}
                editNode={editNode}
              />
            )}
            {editNode.type === 'enqueue_call' && (
              <EnqueueCallTransitions
                nodes={nodes.filter((node) => node.type !== 'trigger')}
                setTransitions={handleSaveTransitions}
                editNode={editNode}
              />
            )}
            {editNode.type === 'make_http_request' && (
              <MakeHttpRequestTransitions
                nodes={nodes.filter((node) => node.type !== 'trigger')}
                setTransitions={handleSaveTransitions}
                editNode={editNode}
              />
            )}
            {editNode.type === 'split_based_on' && (
              <SplitBasedOnTransitions
                nodes={nodes.filter((node) => node.type !== 'trigger')}
                setTransitions={handleSaveTransitions}
                editNode={editNode}
                setEditNode={setEditNode}
                switchToConfigTab={() => setValue(0)}
                onSaveConfig={onSaveConfig}
              />
            )}
          </>
        )}
      </CardContent>
      <CardActions className={classes.actions}>
        {editNode.type !== 'trigger' && <Button onClick={() => onDeleteWidget(editNode.id)} size="small" color="error" variant="contained">Delete</Button>}
        <Button size="small" color="primary" variant="contained" onClick={handleSaveConfig}>Save</Button>
      </CardActions>
    </Card>
  );
};

export default WidgetInfo;
