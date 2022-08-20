/* eslint-disable default-case */


export const mappingSplitBasedOn = (input) => {
  const output = {
    name: input.id,
    type: 'split-based-on',
    transitions: !input.data.input ? [{ event: 'noMatch' }] : input.data.outputs.filter((op) => op.event !== 'match' || op.condition?.value).map((op) => {
      if (op.event === 'noMatch') return {
        event: 'noMatch',
        next: input.data.transitions?.find((tran) => tran.id === op.tranId)?.target ?? undefined
      };
      return {
        event: 'match',
        next: input.data.transitions?.find((tran) => tran.id === op.tranId)?.target ?? undefined,
        conditions: [{
          friendly_name: `If value ${op.condition.type} ${op.condition.value}`,
          arguments: [`{{${input.data.input}}}`],
          type: op.condition.type,
          value: op.condition.value
        }]
      };
    }),
    properties: {
      input: input.data.input ? `{{${input.data.input}}}` : undefined, // 1
      offset: input.position
    }
  };

  return output;
};

export const mappingSetVariables = (input) => {
  const output = {
    name: input.id,
    type: 'set-variables',
    transitions: [{
      next: input.data.transitions?.find((tran) => tran.sourceHandle === 'next')?.target,
      event: 'next'
    }],
    properties: {
      variables: input.data.variables?.map((variable) => ({
        value: variable.value,
        key: variable.key
      })),
      offset: input.position
    }
  };

  return output;
}

export const mappingGatherInputOnCall = (input) => {
  const output = {
    name: input.id,
    type: 'gather-input-on-call',
    transitions: [{
      event: 'keypress',
      next: input.data.transitions?.find((tran) => tran.sourceHandle === 'keypress')?.target,
    }, {
      event: 'speech',
      next: input.data.transitions?.find((tran) => tran.sourceHandle === 'speech')?.target,
    }, {
      event: 'timeout',
      next: input.data.transitions?.find((tran) => tran.sourceHandle === 'timeout')?.target,
    }],
    properties: {
      speech_timeout: input.data.speechTimeout,
      voice: input.data.messageVoice,
      hints: input.data.speechRecognitionHints,
      finish_on_key: input.data.stopGatheringOnKeyPress ? input.data.stopGatheringKeyPress : undefined,
      say: input.data.sayOrPlay === 'say' ? (input.data.say || '') : undefined,
      play: input.data.sayOrPlay === 'play' ? (input.data.play || '') : undefined,
      language: input.data.language,
      stop_gather: input.data.stopGatheringOnKeyPress,
      speech_model: input.data.speechModel?.key === 'none' ? undefined : input.data.speechModel?.value,
      loop: input.data.loop,
      timeout: input.data.timeout,
      profanity_filter: input.data.profanityFilter?.value,
      number_of_digits: input.data.digitLimit,
      gather_language: input.data.speechRecognitionLanguage?.value,
      offset: input.position
    }
  };
  return output;
}

export const mappingSayOrPlay = (input) => {
  const output = {
    name: input.id,
    type: 'say-play',
    transitions: [{
      event: 'audioComplete',
      next: input.data.transitions?.find((tran) => tran.sourceHandle === 'audio complete')?.target,
    }],
    properties: {
      loop: input.data.loop,
      voice: input.data.messageVoice,
      language: input.data.language,
      say: input.data.sayOrPlayOrDigit === 'say' ? (input.data.say || '') : undefined,
      play: input.data.sayOrPlayOrDigit === 'play' ? (input.data.play || '') : undefined,
      digits: input.data.sayOrPlayOrDigit === 'digit' ? (input.data.digit || '') : undefined,
      offset: input.position,
    }
  };
  return output;
}

export const mappingEnqueueCall = (input) => {
  const output = {
    name: input.id,
    type: 'enqueue-call',
    transitions: [
      {
        "next": input.data.transitions?.find((tran) => tran.sourceHandle === 'call complete')?.target ?? undefined,
        "event": "callComplete"
      },
      {
        "next": input.data.transitions?.find((tran) => tran.sourceHandle === 'failed to enqueue')?.target ?? undefined,
        "event": "failedToEnqueue"
      },
      {
        "next": input.data.transitions?.find((tran) => tran.sourceHandle === 'call failed')?.target ?? undefined,
        "event": "callFailure"
      }
    ],
    properties: {
      wait_url: input.data.holdMusicTwimlUrl,
      wait_url_method: input.data.twimlRequestMethod,
      priority: input.data.priority,
      task_attributes: input.data.taskAttributes,
      timeout: input.data.timeout,
      queue_name: input.data.queueOrTaskRouter === 'queue' ? input.data.queueName : undefined,
      offset: input.position,
      workflow_sid: input.data.taskRouterWorkflow?.value
    }
  }
  return output;
}

export const mappingMakeHttpRequest = (input) => {
  const output = {
    name: input.id,
    type: 'make-http-request',
    transitions: [
      {
        "next": input.data.transitions?.find((tran) => tran.sourceHandle === 'success')?.target ?? undefined,
        "event": "success"
      },
      {
        "next": input.data.transitions?.find((tran) => tran.sourceHandle === 'fail')?.target ?? undefined,
        "event": "failed"
      }
    ],
    properties: {
      method: input.data.requestMethod,
      url: input.data.requestUrl,
      content_type: input.data.contentType,
      body: input.data.requestBody,
      parameters: input.data.contentType === 'application/json;charset=utf-8' ? undefined : input.data.parameters?.map((p) => ({ key: p.key, value: p.value })),
      offset: input.position
    }
  }
  return output;
}

export const mappingTrigger = (input) => {
  const output = {
    name: input.id,
    type: 'trigger',
    "transitions": [
      {
        "event": "incomingMessage",
        next: input.data.transitions?.find((tran) => tran.sourceHandle === 'incomming message')?.target ?? undefined,
      },
      {
        "event": "incomingCall",
        next: input.data.transitions?.find((tran) => tran.sourceHandle === 'incomming call')?.target ?? undefined,
      },
      {
        "event": "incomingConversationMessage",
        next: input.data.transitions?.find((tran) => tran.sourceHandle === 'incomming conversation')?.target ?? undefined,
      },
      {
        "event": "incomingRequest",
        next: input.data.transitions?.find((tran) => tran.sourceHandle === 'REST API')?.target ?? undefined,
      },
      {
        "event": "incomingParent",
        next: input.data.transitions?.find((tran) => tran.sourceHandle === 'subflow')?.target ?? undefined,
      }
    ],
    "properties": {
      
      "offset": input.position
    }
  }
  return output;
}

export const mappingToTwilio = (nodes) => {
  const trigger = nodes.filter((node) => node.type === 'trigger')[0];
  const output = {
    initial_state: trigger.id,
    flags: {
      allow_concurrent_calls: Boolean(trigger.data.concurrentCallsTrigger)
    },
    description: trigger.data.label,
    states: nodes.map((widget) => {
      let mapWidget;
      switch (widget.type) {
        case 'trigger':
          mapWidget = mappingTrigger(widget)
          break;
        case 'split_based_on':
          mapWidget = mappingSplitBasedOn(widget);
          break;
        case 'set_variables':
          mapWidget = mappingSetVariables(widget);
          break;
        case 'gather_input_on_call':
          mapWidget = mappingGatherInputOnCall(widget);
          break;
        case 'say_or_play':
          mapWidget = mappingSayOrPlay(widget);
          break;
        case 'enqueue_call':
          mapWidget = mappingEnqueueCall(widget);
          break;
        case 'make_http_request':
          mapWidget = mappingMakeHttpRequest(widget);
          break;
      }
      return mapWidget;
    })
  };
  return output;
}
