/* eslint-disable default-case */
import { getTransitionIdFromData } from '../../utils';
import { getWidgetByType, profanityFilters, speechModels, speechRecognitionLanguages } from '../WidgetLibrary/data';

export const mappingSplitBasedOn = (input) => {
  const output = {
    id: input.name,
    type: 'split_based_on',
    height: 143,
    position: input.properties.offset,
    data: {
      label: input.name,
      input: input.properties.input,
      transitions: input.transitions.map((tran, i) => ({ ...tran, id: `${input.name}condition_${i}` })).filter((tran) => tran.next).map((tran) => ({
        id: getTransitionIdFromData({ source: input.name, sourceHandle: tran.id, target: tran.next, targetHandle: 'input' }),
        source: input.name,
        sourceHandle: tran.id,
        target: tran.next,
        targetHandle: 'input',
        type: 'custom',
        style: {
          strokeWidth: 3,
          stroke: getWidgetByType('split_based_on').connectorColor
        }
      })),
      outputs: input.transitions.map((tran, i) => ({
        tranId: tran.next ? getTransitionIdFromData({ source: input.name, sourceHandle: `${input.name}condition_${i}`, target: tran.next, targetHandle: 'input' }) : undefined,
        event: tran.event,
        id: `${input.name}condition_${i}`,
        label: tran.event === 'noMatch' ? 'No Condition Matches' : undefined,
        condition: tran.event === 'match' ? { type: tran.conditions[0].type, value: tran.conditions[0].value } : undefined
      }))
    },
  };

  return output;
};

export const mappingSetVariables = (input) => {
  const output = {
    id: input.name,
    type: 'set_variables',
    width: 258,
    height: 120,
    position: input.properties.offset,
    data: {
      label: input.name,
      transitions: input.transitions.filter((tran) => tran.next).map((tran) => ({
        id: getTransitionIdFromData({ source: input.name, sourceHandle: tran.id, target: tran.next, targetHandle: 'input' }),
        source: input.name,
        sourceHandle: tran.event,
        target: tran.next,
        targetHandle: 'input',
        type: 'custom',
        style: {
          strokeWidth: 3,
          stroke: getWidgetByType('set_variables').connectorColor
        }
      })),
      variables: input.properties.variables.map((variable, i) => ({
        id: i,
        key: variable.key,
        value: variable.value
      }))
    }
  };

  return output;
}

export const mappingGatherInputOnCall = (input) => {
  const output = {
    id: input.name,
    type: 'gather_input_on_call',
    width: 258,
    height: 120,
    position: input.properties.offset,
    data: {
      label: input.name,
      transitions: input.transitions.filter((tran) => tran.next).map((tran) => ({
        id: getTransitionIdFromData({ source: input.name, sourceHandle: tran.id, target: tran.next, targetHandle: 'input' }),
        source: input.name,
        sourceHandle: tran.event,
        target: tran.next,
        targetHandle: 'input',
        type: 'custom',
        style: {
          strokeWidth: 3,
          stroke: getWidgetByType('gather_input_on_call').connectorColor
        }
      })),
      speechTimeout: input.properties.speech_timeout,
      messageVoice: input.properties.voice,
      speechRecognitionHints: input.properties.hints,
      stopGatheringOnKeyPress: input.properties.stop_gather,
      stopGatheringKeyPress: input.properties.finish_on_key,
      sayOrPlay: input.properties.play ? 'play' : 'say',
      say: input.properties.say,
      play: input.properties.play,
      language: input.properties.language,
      speechModel: speechModels.find((ml) => ml.value === input.properties.speech_model),
      loop: input.properties.loop,
      timeout: input.properties.timeout,
      profanityFilter: profanityFilters.find((f) => f.value === input.properties.profanity_filter),
      digitLimit: input.properties.number_of_digits,
      speechRecognitionLanguage: speechRecognitionLanguages.find((l) => l.value === input.properties.gather_language),
    }
  };
  return output;
}

const sayOrPlay = {
  audioComplete: 'audio complete'
}

export const mappingSayOrPlay = (input) => {
  const output = {
    id: input.name,
    type: 'say_or_play',
    width: 258,
    height: 120,
    position: input.properties.offset,
    data: {
      label: input.name,
      transitions: input.transitions.map((tran) => ({ ...tran, id: sayOrPlay[tran.event] })).filter((tran) => tran.next).map((tran) => ({
        id: getTransitionIdFromData({ source: input.name, sourceHandle: tran.id, target: tran.next, targetHandle: 'input' }),
        source: input.name,
        sourceHandle: tran.id,
        target: tran.next,
        targetHandle: 'input',
        type: 'custom',
        style: {
          strokeWidth: 3,
          stroke: getWidgetByType('say_or_play').connectorColor
        }
      })),
      loop: input.properties.loop,
      messageVoice: input.properties.voice,
      language: input.properties.language,
      sayOrPlayOrDigit: input.properties.say ? 'say' : input.properties.play ? 'play' : 'digit',
      say: input.properties.say ?? undefined,
      play: input.properties.play ?? undefined,
      digit: input.properties.digits ?? undefined,
    }
  };
  return output;
}
const enqueueCall = {
  callComplete: 'call complete',
  failedToEnqueue: 'failed to enqueue',
  callFailure: 'call failed'
}
export const mappingEnqueueCall = (input, workspaces, workflows) => {
  const output = {
    id: input.name,
    type: 'enqueue_call',
    width: 258,
    height: 120,
    position: input.properties.offset,
    data: {
      label: input.name,
      transitions: input.transitions.map((tran) => ({ ...tran, id: enqueueCall[tran.event] })).filter((tran) => tran.next).map((tran) => ({
        id: getTransitionIdFromData({ source: input.name, sourceHandle: tran.id, target: tran.next, targetHandle: 'input' }),
        source: input.name,
        sourceHandle: tran.id,
        target: tran.next,
        targetHandle: 'input',
        type: 'custom',
        style: {
          strokeWidth: 3,
          stroke: getWidgetByType('enqueue_call').connectorColor
        }
      })),
      holdMusicTwimlUrl: input.properties.wait_url,
      twimlRequestMethod: input.properties.wait_url_method,
      priority: input.properties.priority,
      taskAttributes: input.properties.task_attributes,
      timeout: input.properties.timeout,
      queueName: input.properties.queue_name,
      queueOrTaskRouter: input.properties.queue_name ? 'queue' : 'task_router',
      taskRouterWorkflow: workflows.map((wf) => ({ label: wf.friendlyName, value: wf.sid })).find((wf) => wf.value === input.properties.workflow_sid),
      taskRouterWorkspace: workspaces.map((ws) => ({ label: ws.friendly_name, value: ws.sid })).find((ws) => ws.value === workflows.find((wf) => wf.sid === input.properties.workflow_sid)?.workspaceSid) 
    }
  }
  return output;
}

const http = {
  success: 'success',
  failed: 'fail'
}

export const mappingMakeHttpRequest = (input) => {
  const output = {
    id: input.name,
    type: 'make_http_request',
    width: 258,
    height: 120,
    position: input.properties.offset,
    data: {
      label: input.name,
      transitions: input.transitions.map((tran) => ({ ...tran, id: http[tran.event] })).filter((tran) => tran.next).map((tran) => ({
        id: getTransitionIdFromData({ source: input.name, sourceHandle: tran.id, target: tran.next, targetHandle: 'input' }),
        source: input.name,
        sourceHandle: tran.id,
        target: tran.next,
        targetHandle: 'input',
        type: 'custom',
        style: {
          strokeWidth: 3,
          stroke: getWidgetByType('make_http_request').connectorColor
        }
      })),
      requestMethod: input.properties.method,
      requestUrl: input.properties.url,
      contentType: input.properties.content_type,
      requestBody: input.properties.body,
      parameters: input.properties.parameters?.map((p, i) => ({ ...p, id: i })) || []
    }
  }
  return output;
}

const trigger = {
  incomingMessage: 'incomming message',
  incomingCall: 'incomming call',
  incomingConversationMessage: 'incomming conversation',
  incomingRequest: 'REST API',
  incomingParent: 'subflow'
}

export const mappingTrigger = (input, allow_concurrent_calls) => {
  const output = {
    id: input.name,
    type: 'trigger',
    height: 78,
    width: 643,
    position: input.properties.offset,
    data: {
      label: 'Trigger',
      concurrentCallsTrigger: Boolean(allow_concurrent_calls),

      transitions: input.transitions.map((tran) => ({ ...tran, id: trigger[tran.event] })).filter((tran) => tran.next).map((tran) => ({
        id: getTransitionIdFromData({ source: input.name, sourceHandle: tran.id, target: tran.next, targetHandle: 'input' }),
        source: input.name,
        sourceHandle: tran.id,
        target: tran.next,
        targetHandle: 'input',
        type: 'custom',
        style: {
          strokeWidth: 3,
          stroke: getWidgetByType('trigger').connectorColor
        }
      })),
    }
  }
  return output;
}

export const mappingFromTwilio = (data, workspaces = [], workflows = []) => {
  let nodes = data.states.map((widget, i) => {
    let mapWidget;
    switch (widget.type) {
      case 'trigger':
        mapWidget = mappingTrigger(widget, data.flags.allow_concurrent_calls)
        break;
      case 'split-based-on':
        mapWidget = mappingSplitBasedOn(widget);
        break;
      case 'set-variables':
        mapWidget = mappingSetVariables(widget);
        break;
      case 'gather-input-on-call':
        mapWidget = mappingGatherInputOnCall(widget);
        break;
      case 'say-play':
        mapWidget = mappingSayOrPlay(widget);
        break;
      case 'enqueue-call':
        mapWidget = mappingEnqueueCall(widget, workspaces, workflows);
        break;
      case 'make-http-request':
        mapWidget = mappingMakeHttpRequest(widget);
        break;
    }
    return mapWidget;
  })
  let edges = [];
  nodes.forEach((node) => edges = edges.concat(node.data.transitions || []))
  nodes = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      inputValid: Boolean(edges.find((e) => e.target === node.id))
    }
  }));
  return {
    nodes, edges
  };

}
