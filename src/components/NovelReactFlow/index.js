import produce from 'immer';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  updateEdge,
} from 'react-flow-renderer';
import {
  makeStyles
} from '@mui/styles';
import WidgetLibrary from '../WidgetLibrary/index';
import WidgetInfo from '../WidgetInfo/index';
import WidgetGatherInputOnCall from '../WidgetCard/WidgetGatherInputOnCall';
import WidgetTrigger from '../WidgetCard/WidgetTrigger';
import WidgetSetVariables from '../WidgetCard/WidgetSetVariables';
import WidgetSayOrPlay from '../WidgetCard/WidgetSayOrPlay';
import WidgetEnqueueCall from '../WidgetCard/WidgetEnqueueCall';
import WidgetMakeHttpRequest from '../WidgetCard/WidgetMakeHttpRequest';
import WidgetSplitBasedOn from '../WidgetCard/WidgetSplitBasedOn';

import JsonDataView from '../JsonDataView';
import JsonDataImport from '../JsonDataView/ImportTwilioJson';

import { getWidgetByType, getConnectorColorBySourceHandle, conditions, activeEdgeColor } from '../WidgetLibrary/data';
import CustomEdge from '../CustomEdge';
import { getTransitionIdFromData, findElementByClassNameAfterClickEvent } from '../../utils';
import ConfirmBox from '../ConfirmBox';

const nodeTypes = {
  'gather_input_on_call': WidgetGatherInputOnCall,
  'trigger': WidgetTrigger,
  'set_variables': WidgetSetVariables,
  'say_or_play': WidgetSayOrPlay,
  'enqueue_call': WidgetEnqueueCall,
  'make_http_request': WidgetMakeHttpRequest,
  'split_based_on': WidgetSplitBasedOn
};

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    '& .react-flow__background': {
      zIndex: -1
    },
    '& ::-webkit-scrollbar': {
      width: 6
    },

    '& ::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 3px grey',
      borderRadius: 4
    },

    '& ::-webkit-scrollbar-thumb': {
      background: '#CECECE',
      borderRadius: 3
    },

    '& ::-webkit-scrollbar-thumb:hover': {
      background: '#CECECE'
    }
  },
  reactFlowWrapper: {
    width: '100%',
    height: '100%',
  },
  floatingPanel: {
    position: 'absolute',
    right: 20,
    top: 20,
    display: 'flex',
    zIndex: 1001,
    maxHeight: 'calc(100% - 40px)'
  },
}));



let id = 0;


const initialNodes = [{
  id: 'trigger',
  data: { label: 'Trigger' },
  height: 78,
  position: { x: 100, y: 50 },
  type: 'trigger',
  width: 643,
}];
const edgeTypes = {
  custom: CustomEdge,
};

const NovelReactFlow = ({ className, workspaces = [], workflows = [] }) => {
  const classes = useStyles();
  const edgeUpdateSuccessful = useRef(true);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [confirm, setConfirm] = useState();

  const getId = useCallback(() => `node_${nodes.length}`, [nodes]);

  const handleActiveSourceHandle = useCallback((nodeId, sourceHandle) => {
    setEdges((edgs) => {
      return [...edgs].map((edge) => ({
        ...edge,
        style: {
          ...edge.style,
          stroke: edge.sourceHandle === sourceHandle && edge.source === nodeId ? activeEdgeColor : getConnectorColorBySourceHandle(edge.sourceHandle)
        }
      }))
    });
    const activeEdge = edges.find((edge) => edge.source === nodeId && edge.sourceHandle === sourceHandle);

    setNodes(nodes.map((node) => {
      return {
        ...node,
        selected: nodeId === node.id,
        data: {
          ...node.data,
          transitions: edges.filter((edge) => edge.source === node.id),
          activeSource: activeEdge?.source === node.id ? activeEdge.sourceHandle : undefined,
          activeTarget: activeEdge?.target === node.id ? activeEdge.targetHandle : undefined
        },
      };
    }));
  }, [edges, nodes, setEdges, setNodes]);

  const handleDeActiveSourceHandle = useCallback(() => {
    setEdges((edgs) => {
      return [...edgs].map((edge) => ({
        ...edge,
        style: {
          ...edge.style,
          stroke: getConnectorColorBySourceHandle(edge.sourceHandle)
        }
      }))
    });
    setNodes(nodes.map((node) => ({
      ...node,
      selected: false,
      data: {
        ...node.data,
        activeSource: undefined,
        activeTarget: undefined
      }
    })));
  }, [setEdges, setNodes, nodes]);

  const handleDeleteNode = useCallback((nodeId) => {
    setConfirm({
      description: 'Do you want to delete widget?',
      cancelAction: () => setConfirm(),
      confirmAction: () => {
        const deletedEdges = edges.filter((edge) => edge.source === nodeId || edge.target === nodeId)
        setNodes(nodes.filter((node) => node.id !== nodeId).map((node) => {
          const deletedNodeEdges = deletedEdges.filter((edge) => edge.source === node.id || edge.target === node.id)
          if (deletedNodeEdges?.length) {
            let inputValid = node.data.inputValid;
            const deleteNodeTargetEdges = deletedNodeEdges.filter((ed) => ed.target === node.id)
            const deleteNodeSourceEdges = deletedNodeEdges.filter((ed) => ed.source === node.id)
            if (deleteNodeTargetEdges?.length) {
              inputValid = Boolean(edges.find((ed) => ed.target === node.id && !deleteNodeTargetEdges.find((e) => e.id === ed.id && e.target === node.id)))
            }
            return {
              ...node,
              data: {
                ...node.data,
                inputValid,
                transitions: (node.data.transitions || []).filter((tran) => !deletedNodeEdges?.find((edge) => edge.id === tran.id)),
                activeSource: deletedNodeEdges?.find((edge) => edge.sourceHandle === node.data.activeSource) ? undefined : node.data.activeSource,
                activeTarget: deletedNodeEdges?.find((edge) => edge.targetHandle === node.data.activeTarget) ? undefined : node.data.activeTarget,
                outputs: node.type !== 'split_based_on' ? node.data.outputs : (node.data.outputs || []).map(
                  (op) => !deleteNodeSourceEdges.find((edge) => edge.sourceHandle === op.id) ? op : ({ ...op, tranId: null })
                )
              }
            }
          }
          return node;
        }));
        setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
        setConfirm();
      }
    });
  }, [edges, nodes, setEdges, setNodes]);

  const handleCheckSplitNode = useCallback((nodeId) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;
    const invalidOutputs = node.data.outputs.filter((op) => op.event === 'match' && !op.condition.value.trim());
    if (!invalidOutputs.length) return;
    const invalidEdges = invalidOutputs.map((op) => op.tranId).filter((id) => id);
    setNodes(produce(nodes, draft => {
      const index = draft.findIndex((n) => n.id === nodeId);
      draft[index].data.outputs = draft[index].data.outputs.filter((op) => !invalidOutputs.find((o) => o.id === op.id));
      draft[index].data.transitions = draft[index].data.transitions.filter((tran) => !invalidEdges.includes(tran.id));
    }));
    setEdges((eds) => eds.filter((ed) => !invalidEdges.includes(ed.id)));
  }, [nodes, setEdges, setNodes]);

  const handleNewCondition = useCallback((nodeId) => {
    setNodes((prev) => produce(prev, draft => {
      const index = draft.findIndex((node) => node.id === nodeId);
      draft[index].data.outputs.push({
        id: `${nodeId}condition_${draft[index].data.outputs.length}`,
        event: 'match',
        condition: {
          type: conditions[0].value,
          value: ''
        }
      })
    }));
    setTimeout(() => {
      document.getElementById('transition-tab')?.click();
      setTimeout(() => {
        const configTab = document.getElementById('config-tab');
        if (!configTab) return;
        configTab.scrollTop = configTab.scrollHeight;
      });
    });
  }, [setNodes]);

  useEffect(() => {
    function handleClickOutside(event) {
      const floatPanelElement = findElementByClassNameAfterClickEvent(event, classes.floatingPanel);
      if (floatPanelElement) return;
      const sourceHandleElement = findElementByClassNameAfterClickEvent(event, 'source_handle');
      if (sourceHandleElement) {
        const { nodeId, sourceHandle } = sourceHandleElement.dataset;
        handleActiveSourceHandle(nodeId, sourceHandle)
      } else {
        const activeEdge = edges.find((edge) => edge.style?.stroke === activeEdgeColor);
        const activeNodeElement = event.path.find((ele) => ele.id === activeEdge?.source);
        if (activeEdge && !activeNodeElement) handleDeActiveSourceHandle();
      }
      const deleteWidgetElement = findElementByClassNameAfterClickEvent(event, 'delete_widget');
      if (deleteWidgetElement) {
        const { nodeId } = deleteWidgetElement.dataset;
        handleDeleteNode(nodeId)
      }
      const fakeCheckSplitElement = findElementByClassNameAfterClickEvent(event, 'fake-btn-check-split');
      if (fakeCheckSplitElement) {
        const { nodeId } = fakeCheckSplitElement.dataset;
        handleCheckSplitNode(nodeId)
      }
    }
    // Bind the event listener
    window.addEventListener("click", handleClickOutside);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [classes.floatingPanel, edges, handleActiveSourceHandle, handleCheckSplitNode, handleDeActiveSourceHandle, handleDeleteNode, nodes, setNodes]);

  const onConnect = useCallback((params) => {
    const newEdge = {
      id: getTransitionIdFromData(params),
      ...params,
      type: 'custom',
      style: { strokeWidth: 3, stroke: getConnectorColorBySourceHandle(params.sourceHandle) },
    }
    setEdges((eds) => eds.concat([newEdge]))
    setNodes(nodes.map((node) => {
      if (node.id === params.source) {
        return {
          ...node,
          data: {
            ...node.data,
            transitions: (node.data.transitions || []).concat(newEdge),
            outputs: node.type !== 'split_based_on' ? node.data.outputs :
              (node.data.outputs || []).map((op) => op.id === params.sourceHandle ? ({ ...op, tranId: newEdge.id }) : op)
          }
        }
      }
      if (node.id === params.target) return {
        ...node,
        data: {
          ...node.data,
          inputValid: true
        }
      };
      return node;
    }));
  }, [setEdges, setNodes, nodes]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const widgetTypeInfo = getWidgetByType(type);
      const id = getId();
      const nodeId = `${widgetTypeInfo.name} ${id}`;
      const newNode = {
        id: nodeId,
        type,
        position,
        data: {
          label: nodeId,
          requiredInput: Boolean(widgetTypeInfo.targetHandles.length),
          inputValid: !Boolean(widgetTypeInfo.targetHandles.length),
          outputs: widgetTypeInfo.type === 'split_based_on' ? [
            { id: nodeId + 'condition_0', event: 'noMatch', label: 'No Condition Matches' },
            { id: nodeId + 'condition_1', event: 'match', condition: { type: conditions[0].value, value: '' } },
          ] : null,
          newCondition: handleNewCondition,
          transitions: [],
          ...(widgetTypeInfo.defaultData || {})
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [getId, handleNewCondition, reactFlowInstance, setNodes]
  );

  const updateNodesAsRemoveEdge = useCallback((edge) => {
    const isActiveEdge = edge.style.stroke === activeEdgeColor
    setNodes(nodes.map((node) => {
      if (node.id === edge.source) {
        return {
          ...node,
          data: {
            ...node.data,
            activeSource: edge.sourceHandle === node.data.activeSource && isActiveEdge ? undefined : node.data.activeSource,
            transitions: (node.data.transitions || []).filter((ed) => ed.id !== edge.id),
            outputs: node.type !== 'split_based_on' ? node.data.outputs : (node.data.outputs || []).map(
              (op) => edge.sourceHandle !== op.id ? op : ({ ...op, tranId: null })
            )
          }
        }
      }
      if (node.id === edge.target) {
        const inputValid = Boolean(edges.find((ed) => ed.target === node.id && edge.id !== ed.id));
        return {
          ...node,
          data: {
            ...node.data,
            inputValid,
            activeTarget: edge.targetHandle === node.data.activeTarget && isActiveEdge ? undefined : node.data.activeTarget,
          }
        };
      }
      return node;
    }));
  }, [edges, nodes, setNodes]);

  const onEdgeUpdateStart = useCallback((_, edge) => {
    edgeUpdateSuccessful.current = false;
    updateNodesAsRemoveEdge(edge);
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  }, [setEdges, updateNodesAsRemoveEdge]);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, [setEdges]);

  const onEdgeUpdateEnd = useCallback((event, edge) => {
    updateNodesAsRemoveEdge(edge);
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    edgeUpdateSuccessful.current = true;
  }, [setEdges, updateNodesAsRemoveEdge]);

  useEffect(() => {
    console.log('updated nodes', nodes);
  }, [nodes]);

  const handleSaveConfig = useCallback((node) => {
    setNodes([...nodes].map((_node) => _node.id !== node.id ? _node : node));
  }, [nodes, setNodes]);

  const handleSaveTransitions = useCallback((_node, newEdge, sourceHandle) => {
    if (!newEdge) {
      const existedEdge = edges.find((edge) => edge.source === _node.id && edge.sourceHandle === sourceHandle);
      const isActiveEdge = existedEdge?.style?.stroke === activeEdgeColor
      if (existedEdge) {
        setNodes(nodes.map((node) => {
          if (node.id === existedEdge.source || existedEdge.target === node.id) {
            let inputValid = node.data.inputValid;
            if (existedEdge.target === node.id) {
              inputValid = Boolean(edges.find((edge) => edge.id !== existedEdge.id && edge.target === node.id));
            }
            return {
              ...(_node.id === node.id ? _node : node),
              data: {
                ...(_node.id === node.id ? _node.data : node.data),
                inputValid: inputValid,
                transitions: (node.data.transitions || []).filter((tran) => tran.id !== existedEdge.id),
                activeSource: isActiveEdge && node.id === _node.id && node.data.activeSource === existedEdge.sourceHandle ? undefined : node.data.activeSource,
                activeTarget: isActiveEdge && node.id === existedEdge.target && node.data.activeTarget === existedEdge.targetHandle ? undefined : node.data.activeTarget
              }
            }
          }
          return _node.id === node.id ? _node : node;
        }));
        setEdges((eds) => eds.filter((edge) => edge.id !== existedEdge.id))
      }
    } else {
      const oldEdge = edges.find((edge) => edge.source === _node.id && edge.sourceHandle === sourceHandle);
      setNodes(nodes.map((node) => {
        if (newEdge.source === node.id) {
          return {
            ...(_node.id === node.id ? _node : node),
            data: {
              ...(_node.id === node.id ? _node.data : node.data),
              transitions: (node.data.transitions || []).concat([newEdge]).filter((edge) => edge.id !== oldEdge?.id),
            }
          }
        }
        if (oldEdge?.target === node.id) {
          return {
            ...(_node.id === node.id ? _node : node),
            data: {
              ...(_node.id === node.id ? _node.data : node.data),
              inputValid: Boolean(edges.find((ed) => ed.target === node.id && ed.id !== oldEdge.id)),
            }
          }
        }
        if (newEdge.target === node.id) {
          return {
            ...(_node.id === node.id ? _node : node),
            data: {
              ...(_node.id === node.id ? _node.data : node.data),
              inputValid: true,
            }
          }
        }
        return _node.id === node.id ? _node : node;
      }));
      setEdges((eds) => eds.concat([newEdge]).filter((edge) => edge.id !== oldEdge?.id))
    }
  }, [edges, nodes, setEdges, setNodes]);

  const [jsonData, setJsonData] = useState();

  const handleShowFlowJson = useCallback(() => {
    setJsonData(reactFlowInstance.toObject());
  }, [reactFlowInstance]);

  const onEdgeClick = useCallback((event, edge) => {
    setEdges((edgs) => produce(edgs, draft => {
      const index = draft.findIndex((e) => e.id === edge.id);
      draft[index].animated = !draft[index].animated;
    }));
  }, [setEdges]);

  const [showImport, setShowImport] = useState(false);

  const handleImport = useCallback((data) => {
    window.setEdges = setEdges;
    const restoreFlow = async () => {
      setNodes(data.nodes.map((node) => node.type !== 'split_based_on' ? node : ({
        ...node,
        data: {
          ...node.data,
          newCondition: handleNewCondition
        }
      })))
      setEdges(data.edges)
    };

    restoreFlow();

  }, [handleNewCondition, setEdges, setNodes]);

  return (
    <div className={`${className} ${classes.root}`}>
      <ReactFlowProvider>
        <div className={classes.reactFlowWrapper} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultZoom={1}
            onEdgeClick={onEdgeClick}
          >
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
        <div className={classes.floatingPanel}>
          <WidgetLibrary onImportJsonFlow={() => setShowImport(true)} />
          {nodes.find((node) => node.selected) && (
            <WidgetInfo
              nodes={nodes}
              activeNode={nodes.find((node) => node.selected)}
              onSaveConfig={handleSaveConfig}
              onSaveTransitions={handleSaveTransitions}
              onDeleteWidget={handleDeleteNode}
              onShowFlowJson={handleShowFlowJson}
              workflows={workflows}
              workspaces={workspaces}
            />
          )}
        </div>
        <Background color="#aaa" gap={16} />
      </ReactFlowProvider>
      {jsonData && <JsonDataView jsonData={jsonData} onClose={() => setJsonData()} />}
      {showImport && <JsonDataImport onImport={handleImport} onClose={() => setShowImport(false)} workspaces={workspaces} workflows={workflows} />}
      {confirm && <ConfirmBox {...confirm} />}
    </div>
  );
};

export default NovelReactFlow;
