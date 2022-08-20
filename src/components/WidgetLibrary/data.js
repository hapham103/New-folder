import React from 'react';
import { FlowControlIcon, PhoneIcon, ToolsAndExecutionsIcon } from '../icons/index';

export const triggerWidget = {
  name: 'Trigger',
  group: 'trigger',
  type: 'trigger',
  targetHandles: [],
  sourceHandles: ['incomming message', 'incomming call', 'incomming conversation', 'REST API', 'subflow'],
  connectorColor: '#276BF0'
}
export const splitBasedOnWidget = {
  name: 'Split Based On',
  group: 'flow_controls',
  type: 'split_based_on',
  targetHandles: ['input'],
  sourceHandles: [],
  connectorColor: 'rgb(117, 100, 196)',
}
export const setVariablesWidget = {
  name: 'Set Variables',
  group: 'flow_controls',
  type: 'set_variables',
  targetHandles: ['input'],
  sourceHandles: ['next'],
  connectorColor: 'rgb(0, 62, 130)',
  defaultData: {
    variables: []
  }
}
export const sayOrPlayWidget = {
  name: 'Say or Play',
  group: 'voice',
  type: 'say_or_play',
  targetHandles: ['input'],
  sourceHandles: ['audio complete'],
  connectorColor: 'rgb(42, 151, 98)',
  defaultData: {
    loop: 1
  }
}
export const gatherInputOnCallWidget = {
  name: 'Gather Info',
  group: 'voice',
  type: 'gather_input_on_call',
  targetHandles: ['input'],
  sourceHandles: ['keypress', 'speech', 'timeout'],
  connectorColor: 'rgb(42, 151, 98)',
  defaultData: {
    loop: 1,
    timeout: 5,
    stopGatheringKeyPress: '#',
    stopGatheringOnKeyPress: true,
    digitLimit: 5,
    speechTimeout: 'auto'
  }
}
export const enqueueCallWidget = {
  name: 'Enqueue Call',
  group: 'voice',
  type: 'enqueue_call',
  targetHandles: ['input'],
  sourceHandles: ['call complete', 'failed to enqueue', 'call failed'],
  connectorColor: 'rgb(0, 62, 130)'
}
export const makeHttpRequestWidget = {
  name: 'Make HTTP Request',
  group: 'tools_executions',
  type: 'make_http_request',
  targetHandles: ['input'],
  sourceHandles: ['success', 'fail'],
  connectorColor: 'rgb(0, 62, 130)',
  defaultData: {
    requestMethod: 'GET',
    contentType: 'application/x-www-form-urlencoded;charset=utf-8'
  }
}

export const activeEdgeColor = '#3595d1'

export const widgets = [
  triggerWidget,
  splitBasedOnWidget,
  setVariablesWidget,
  gatherInputOnCallWidget,
  sayOrPlayWidget,
  enqueueCallWidget,
  makeHttpRequestWidget
];

export const getWidgetByType = (type) => widgets.find((w) => w.type === type);
export const getConnectorColorByType = (type) => widgets.find((w) => w.type === type)?.connectorColor;
export const getConnectorColorBySourceHandle = (sourceHandle) => widgets.find((w) => w.sourceHandles.includes(sourceHandle))?.connectorColor || splitBasedOnWidget.connectorColor;

export const widgetGroups = [
  {
    name: 'FLOW CONTROLS',
    icon: <FlowControlIcon />,
    items: widgets.filter((item) => item.group === 'flow_controls')
  }, {
    name: 'VOICE',
    icon: <PhoneIcon />,
    items: widgets.filter((item) => item.group === 'voice')
  }, {
    name: 'TOOLS & EXECUTIONS',
    icon: <ToolsAndExecutionsIcon />,
    items: widgets.filter((item) => item.group === 'tools_executions')
  }
];

export const languages = [
    {
        "value": "default",
        "label": "Default",
        "voices": []
    },
    {
        "value": "en-US",
        "label": "Enlish (US)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                "label": "Man",
                "value": "man"
            },
            {
                "label": "Woman",
                "value": "woman"
            },
            {
                "label": "[Polly] Salli",
                "value": "Polly.Salli"
            },
            {
                "label": "[Polly] Ivy",
                "value": "Polly.Ivy"
            },
            {
                "label": "[Polly] Joanna",
                "value": "Polly.Joanna"
            },
            {
                "label": "[Polly] Kendra",
                "value": "Polly.Kendra"
            },
            {
                "label": "[Polly] Kimberly",
                "value": "Polly.Kimberly"
            },
            {
                "label": "[Polly] Joey",
                "value": "Polly.Joey"
            },
            {
                "label": "[Polly] Justin",
                "value": "Polly.Justin"
            },
            {
                "label": "[Polly] Matthew",
                "value": "Polly.Matthew"
            },
            {
                "label": "[Polly] Salli-Neural",
                "value": "Polly.Salli-Neural"
            },
            {
                "label": "[Polly] Ivy-Neural",
                "value": "Polly.Ivy-Neural"
            },
            {
                "label": "[Polly] Joanna-Neural",
                "value": "Polly.Joanna-Neural"
            },
            {
                "label": "[Polly] Kendra-Neural",
                "value": "Polly.Kendra-Neural"
            },
            {
                "label": "[Polly] Kimberly-Neural",
                "value": "Polly.Kimberly-Neural"
            },
            {
                "label": "[Polly] Joey-Neural",
                "value": "Polly.Joey-Neural"
            },
            {
                "label": "[Polly] Justin-Neural",
                "value": "Polly.Justin-Neural"
            },
            {
                "label": "[Polly] Matthew-Neural",
                "value": "Polly.Matthew-Neural"
            },
            {
                "label": "[Polly] Kevin-Neural",
                "value": "Polly.Kevin-Neural"
            }
        ]
    },
    {
        "value": "en-AU",
        "label": "English (Australian)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                "label": "[Polly] Nicole",
                "value": "Polly.Nicole"
            },
            {
                "label": "[Polly] Russell",
                "value": "Polly.Russell"
            },
            {
                "label": "[Polly] Olivia-Neural",
                "value": "Polly.Olivia-Neural"
            }
        ]
    },
    {
        "value": "en-CA",
        "label": "English (Canada)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            }
        ]
    },
    {
        "value": "en-GB",
        "label": "English (British)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                "label": "Man",
                "value": "man"
            },
            {
                "label": "Woman",
                "value": "woman"
            },
            {
                "label": "[Polly] Amy",
                "value": "Polly.Amy"
            },
            {
                "label": "[Polly] Emma",
                "value": "Polly.Emma"
            },
            {
                "label": "Briant",
                "value": "briant"
            },
            {
                "label": "[Polly] Amy-Neural",
                "value": "Polly.Amy-Neural"
            },
            {
                "label": "[Polly] Emma-Neural",
                "value": "Polly.Emma-Neural"
            }
        ]
    },
    {
        "value": "en-IN",
        "label": "English (Indian)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                "label": "[Polly] Aditi",
                "value": "Polly.Aditi"
            },
            {
                "label": "[Polly] Raveena",
                "value": "Polly.Raveena"
            },
        ]
    },
    {
        "value": "da-DK",
        "label": "Danish",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                label: '[Polly] Naja',
                value: 'Polly.Naja'
            },
            {
                label: '[Polly] Mads',
                value: 'Polly.Mads'
            },
        ]
    },
    {
        "value": "de-DE",
        "label": "German",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                label: '[Polly] Marlene',
                value: 'Polly.Marlene'
            },
            {
                label: '[Polly] Vick',
                value: 'Polly.Vick'
            },
            {
                label: '[Polly] Hans',
                value: 'Polly.Hans'
            },
            {
                label: '[Polly] Vicki-Neural',
                value: 'Polly.Vicki-Neural'
            },
        ]
    },
    {
        "value": "ca-ES",
        "label": "Catalan (Spain)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                label: '[Polly] Arlet-Neural',
                value: 'Polly.Arlet-Neural'
            }
        ]
    },
    {
        "value": "es-ES",
        "label": "Spanish (Spain)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                label: '[Polly] Conchita',
                value: 'Polly.Conchita'
            },
            {
                label: 'Enrique',
                value: 'Polly.Enrique'
            },
            {
                label: '[Polly] Lucia',
                value: 'Polly.Lucia'
            },
            {
                label: '[Polly] Lucia-Neural',
                value: 'Polly.Lucia-Neural'
            }
        ]
    },
    {
        "value": "es-MX",
        "label": "Spanish (Mexico)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                label: '[Polly] Mia',
                value: 'Polly.Mia'
            },
            {
                label: '[Polly] Mia-Neural',
                value: 'Polly.Mia-Neural'
            },
        ]
    },
    {
        "value": "fi-FI",
        "label": "Finnish (Finland)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            }
        ]
    },
    {
        "value": "fr-CA",
        "label": "French (Canadian)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                label: '[Polly] Chantal',
                value: 'Polly.Chantal'
            },{
                label: '[Polly] Grabrielle',
                value: 'Polly.Grabrielle'
            },
        ]
    },
    {
        "value": "fr-FR",
        "label": "French",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                label: '[Polly] Celine',
                value: 'Polly.Celine'
            },
            {
                label: '[Polly] MaThieu',
                value: 'Polly.MaThieu'
            },
            {
                label: '[Polly] Lea',
                value: 'Polly.Lea'
            },
            {
                label: '[Polly] Lea-Neural',
                value: 'Polly.Lea-Neural'
            }
        ]
    },
    {
        "value": "it-IT",
        "label": "Italian",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                label: '[Polly] Carla',
                value: 'Polly.Carla'
            },
            {
                label: '[Polly] Giorgio',
                value: 'Polly.Giorgio'
            },
            {
                label: '[Polly] Bianca',
                value: 'Polly.Bianca'
            },
            {
                label: '[Polly] Bianca-Neural',
                value: 'Polly.Bianca-Neural'
            }
        ]
    },
    {
        "value": "ja-JP",
        "label": "Japanese",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                label: '[Polly] Mizuki',
                value: 'Polly.Mizuki'
            },
            {
                label: 'Takumi',
                value: '[Polly] Polly.Takumi'
            },
            {
                label: '[Polly] Takumi-Neural',
                value: 'Polly.Takumi-Neural'
            },
        ]
    },
    {
        "value": "ko-KR",
        "label": "Korean",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                label: '[Polly] Seoyeon',
                value: 'Polly.Seoyeon'
            },{
                label: '[Polly] Seoyeon-Neural',
                value: 'Polly.Seoyeon-Neural'
            },
        ]
    },
    {
        "value": "nb-NO",
        "label": "Norwegian",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                "label": "[Polly] Liv",
                "value": "Polly.Liv"
            },
        ]
    },
    {
        "value": "nl-NL",
        "label": "Dutch",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                "label": "[Polly] Lotte",
                "value": "Polly.Lotte"
            },
            {
                "label": "[Polly] Ruben",
                "value": "Polly.Ruben"
            }
        ]
    },
    {
        "value": "pl-PL",
        "label": "Polish",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                "label": "[Polly] Ewa",
                "value": "Polly.Ewa"
            },
            {
                "label": "[Polly] Maja",
                "value": "Polly.Maja"
            },
            {
                "label": "[Polly] Jan",
                "value": "Polly.Jan"
            }
        ]
    },
    {
        "value": "pt-BR",
        "label": "Portuguese (Brazilian)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                "label": "[Polly] Vitoria",
                "value": "Polly.Vitoria"
            },
            {
                "label": "[Polly] Ricardo",
                "value": "Polly.Ricardo"
            },
            {
                "label": "[Polly] Camila",
                "value": "Polly.Camila"
            },
            {
                "label": "[Polly] Camila-Neural",
                "value": "Polly.Camila-Neural"
            }
        ]
    },
    {
        "value": "pt-PT",
        "label": "Portuguese (European)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                "label": "[Polly] Ines",
                "value": "Polly.Ines"
            },
            {
                "label": "[Polly] Cristiano",
                "value": "Polly.Cristiano"
            },
            {
                "label": "[Polly] Ines-Neural",
                "value": "Polly.Ines-Neural"
            }
        ]
    },
    {
        "value": "ru-RU",
        "label": "Russian",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                "label": "[Polly] Tatyana",
                "value": "Polly.Tatyana"
            },
            {
                "label": "[Polly] Maxim",
                "value": "Polly.Maxim"
            }
        ]
    },
    {
        "value": "sv-SE",
        "label": "Swedish",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            },
            {
                "label": "[Polly] Astrid",
                "value": "Polly.Astrid"
            }
        ]
    },
    {
        "value": "zh-CN",
        "label": "Chinese (Mandarin)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            }
        ]
    },
    {
        "value": "zh-HK",
        "label": "Chinese (Cantonese)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            }
        ]
    },
    {
        "value": "zh-TW",
        "label": "Chinese (Taiwanese Mandarin)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "Alice",
                "value": "alice"
            }
        ]
    },
    {
        "value": "en-NZ",
        "label": "English (New Zealand)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "[Polly] Aria-Neural",
                "value": "Polly.Aria-Neural"
            }
        ]
    },
    {
        "value": "en-ZA",
        "label": "English (South African)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "[Polly] Ayanda-Neural",
                "value": "Polly.Ayanda-Neural"
            }
        ]
    },
    {
        "value": "en-GB-WLS",
        "label": "English (Welsh)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "[Polly] Geraint",
                "value": "Polly.Geraint"
            }
        ]
    },
    {
        "value": "de-AT",
        "label": "German (Austrian)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "[Polly] Hannah-Neural",
                "value": "Polly.Hannah-Neural"
            }
        ]
    },
    {
        "value": "hi-IN",
        "label": "Hindi",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "[Polly] Aditi",
                "value": "Polly.Aditi"
            }
        ]
    },
    {
        "value": "is-IS",
        "label": "Icelandic",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "[Polly] Dora",
                "value": "Polly.Dora"
            },
            {
                "label": "[Polly] Karl",
                "value": "Polly.Karl"
            }
        ]
    },
    {
        "value": "ro-RO",
        "label": "Romanian",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "[Polly] Carmen",
                "value": "Polly.Carmen"
            }
        ]
    },
    {
        "value": "es-US",
        "label": "Spanish (Latin American)",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "[Polly] Penelope",
                "value": "Polly.Penelope"
            },
            {
                "label": "[Polly] Miguel",
                "value": "Polly.Miguel"
            },
            {
                "label": "[Polly] Lupe",
                "value": "Polly.Lupe"
            },
            {
                "label": "[Polly] Lupe-Neural",
                "value": "Polly.Lupe-Neural"
            }
        ]
    },
    {
        "value": "tr-TR",
        "label": "Turkish",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "[Polly] Filiz",
                "value": "Polly.Filiz"
            }
        ]
    },
    {
        "value": "cy-GB",
        "label": "Welsh",
        "voices": [
            {
                "label": "Default",
                "value": "default"
            },
            {
                "label": "[Polly] Gwyneth",
                "value": "Polly.Gwyneth"
            }
        ]
    }
]

export const speechRecognitionLanguages = [
    {
        "label": "English (United States)",
        "value": "en-US"
    },
    {
        "label": "Afrikaans (South Africa)",
        "value": "af-ZA"
    },
    {
        "label": "Amharic (Ethiopia)",
        "value": "am-ET"
    },
    {
        "label": "Armenian (Armenia)",
        "value": "hy-AM"
    },
    {
        "label": "Azerbaijani (Azerbaijani)",
        "value": "az-AZ"
    },
    {
        "label": "Indonesian (Indonesia)",
        "value": "id-ID"
    },
    {
        "label": "Malay (Malaysia)",
        "value": "ms-MY"
    },
    {
        "label": "Bengali (Bangladesh)",
        "value": "bn-BD"
    },
    {
        "label": "Bengali (India)",
        "value": "bn-IN"
    },
    {
        "label": "Catalan (Spain)",
        "value": "ca-ES"
    },
    {
        "label": "Czech (Czech Republic)",
        "value": "cs-CZ"
    },
    {
        "label": "Danish (Denmark)",
        "value": "da-DK"
    },
    {
        "label": "German (Germany)",
        "value": "de-DE"
    },
    {
        "label": "English (Australia)",
        "value": "en-AU"
    },
    {
        "label": "English (Canada)",
        "value": "en-CA"
    },
    {
        "label": "English (Ghana)",
        "value": "en-GH"
    },
    {
        "label": "English (United Kingdom)",
        "value": "en-GB"
    },
    {
        "label": "English (India)",
        "value": "en-IN"
    },
    {
        "label": "English (Ireland)",
        "value": "en-IE"
    },
    {
        "label": "English (Kenya)",
        "value": "en-KE"
    },
    {
        "label": "English (New Zealand)",
        "value": "en-NZ"
    },
    {
        "label": "English (Nigeria)",
        "value": "en-NG"
    },
    {
        "label": "English (Philippines)",
        "value": "en-PH"
    },
    {
        "label": "English (South Africa)",
        "value": "en-ZA"
    },
    {
        "label": "English (Tanzania)",
        "value": "en-TZ"
    },
    {
        "label": "Spanish (Argentina)",
        "value": "es-AR"
    },
    {
        "label": "Spanish (Bolivia)",
        "value": "es-BO"
    },
    {
        "label": "Spanish (Chile)",
        "value": "es-CL"
    },
    {
        "label": "Spanish (Colombia)",
        "value": "es-CO"
    },
    {
        "label": "Spanish (Costa Rica)",
        "value": "es-CR"
    },
    {
        "label": "Spanish (Ecuador)",
        "value": "es-EC"
    },
    {
        "label": "Spanish (El Salvador)",
        "value": "es-SV"
    },
    {
        "label": "Spanish (Spain)",
        "value": "es-ES"
    },
    {
        "label": "Spanish (United States)",
        "value": "es-US"
    },
    {
        "label": "Spanish (Guatemala)",
        "value": "es-GT"
    },
    {
        "label": "Spanish (Honduras)",
        "value": "es-HN"
    },
    {
        "label": "Spanish (Mexico)",
        "value": "es-MX"
    },
    {
        "label": "Spanish (Nicaragua)",
        "value": "es-NI"
    },
    {
        "label": "Spanish (Panama)",
        "value": "es-PA"
    },
    {
        "label": "Spanish (Paraguay)",
        "value": "es-PY"
    },
    {
        "label": "Spanish (Peru)",
        "value": "es-PE"
    },
    {
        "label": "Spanish (Puerto Rico)",
        "value": "es-PR"
    },
    {
        "label": "Spanish (Dominican Republic)",
        "value": "es-DO"
    },
    {
        "label": "Spanish (Uruguay)",
        "value": "es-UY"
    },
    {
        "label": "Spanish (Venezuela)",
        "value": "es-VE"
    },
    {
        "label": "Basque (Spain)",
        "value": "eu-ES"
    },
    {
        "label": "Filipino (Philippines) f",
        "value": "il-PH"
    },
    {
        "label": "French (Canada)",
        "value": "fr-CA"
    },
    {
        "label": "French (France)",
        "value": "fr-FR"
    },
    {
        "label": "Galician (Spain)",
        "value": "gl-ES"
    },
    {
        "label": "Georgian (Georgia)",
        "value": "ka-GE"
    },
    {
        "label": "Gujarati (India)",
        "value": "gu-IN"
    },
    {
        "label": "Croatian (Croatia)",
        "value": "hr-HR"
    },
    {
        "label": "Zulu (South Africa)",
        "value": "zu-ZA"
    },
    {
        "label": "Icelandic (Iceland)",
        "value": "is-IS"
    },
    {
        "label": "Italian (Italy)",
        "value": "it-IT"
    },
    {
        "label": "Javanese (Indonesia)",
        "value": "jv-ID"
    },
    {
        "label": "Kannada (India)",
        "value": "kn-IN"
    },
    {
        "label": "Khmer (Cambodian)",
        "value": "km-KH"
    },
    {
        "label": "Lao (Laos)",
        "value": "lo-LA"
    },
    {
        "label": "Latvian (Latvia)",
        "value": "lv-LV"
    },
    {
        "label": "Lithuanian (Lithuania)",
        "value": "lt-LT"
    },
    {
        "label": "Hungarian (Hungary)",
        "value": "hu-HU"
    },
    {
        "label": "Malayalam (India)",
        "value": "ml-IN"
    },
    {
        "label": "Marathi (India)",
        "value": "mr-IN"
    },
    {
        "label": "Dutch (Netherlands)",
        "value": "nl-NL"
    },
    {
        "label": "Nepali (Nepal)",
        "value": "ne-NP"
    },
    {
        "label": "Norwegian Bokmål (Norway)",
        "value": "nb-NO"
    },
    {
        "label": "Polish (Poland)",
        "value": "pl-PL"
    },
    {
        "label": "Portuguese (Brazil)",
        "value": "pt-BR"
    },
    {
        "label": "Portuguese (Portugal)",
        "value": "pt-PT"
    },
    {
        "label": "Romanian (Romania)",
        "value": "ro-RO"
    },
    {
        "label": "Sinhala (Sri Lanka)",
        "value": "si-LK"
    },
    {
        "label": "Slovak (Slovakia)",
        "value": "sk-SK"
    },
    {
        "label": "Slovenian (Slovenia)",
        "value": "sl-SI"
    },
    {
        "label": "Sundanese (Indonesia)",
        "value": "su-ID"
    },
    {
        "label": "Swahili (Tanzania)",
        "value": "sw-TZ"
    },
    {
        "label": "Swahili (Kenya)",
        "value": "sw-KE"
    },
    {
        "label": "Finnish (Finland)",
        "value": "fi-FI"
    },
    {
        "label": "Swedish (Sweden)",
        "value": "sv-SE"
    },
    {
        "label": "Tamil (India)",
        "value": "ta-IN"
    },
    {
        "label": "Tamil (Singapore)",
        "value": "ta-SG"
    },
    {
        "label": "Tamil (Sri Lanka)",
        "value": "ta-LK"
    },
    {
        "label": "Tamil (Malaysia)",
        "value": "ta-MY"
    },
    {
        "label": "Telugu (India)",
        "value": "te-IN"
    },
    {
        "label": "Vietnamese (Vietnam)",
        "value": "vi-VN"
    },
    {
        "label": "Turkish (Turkey)",
        "value": "tr-TR"
    },
    {
        "label": "Urdu (Pakistan)",
        "value": "ur-PK"
    },
    {
        "label": "Urdu (India)",
        "value": "ur-IN"
    },
    {
        "label": "Greek (Greece)",
        "value": "el-GR"
    },
    {
        "label": "Bulgarian (Bulgaria)",
        "value": "bg-BG"
    },
    {
        "label": "Russian (Russia)",
        "value": "ru-RU"
    },
    {
        "label": "Serbian (Serbia)",
        "value": "sr-RS"
    },
    {
        "label": "Ukrainian (Ukraine)",
        "value": "uk-UA"
    },
    {
        "label": "Hebrew (Israel)",
        "value": "he-IL"
    },
    {
        "label": "Arabic (Israel)",
        "value": "ar-IL"
    },
    {
        "label": "Arabic (Jordan)",
        "value": "ar-JO"
    },
    {
        "label": "Arabic (United Arab Emirates)",
        "value": "ar-AE"
    },
    {
        "label": "Arabic (Bahrain)",
        "value": "ar-BH"
    },
    {
        "label": "Arabic (Algeria)",
        "value": "ar-DZ"
    },
    {
        "label": "Arabic (Saudi Arabia)",
        "value": "ar-SA"
    },
    {
        "label": "Arabic (Iraq)",
        "value": "ar-IQ"
    },
    {
        "label": "Arabic (Kuwait)",
        "value": "ar-KW"
    },
    {
        "label": "Arabic (Morocco)",
        "value": "ar-MA"
    },
    {
        "label": "Arabic (Tunisia)",
        "value": "ar-TN"
    },
    {
        "label": "Arabic (Oman)",
        "value": "ar-OM"
    },
    {
        "label": "Arabic (State of Palestine)",
        "value": "ar-PS"
    },
    {
        "label": "Arabic (Qatar)",
        "value": "ar-QA"
    },
    {
        "label": "Arabic (Lebanon)",
        "value": "ar-LB"
    },
    {
        "label": "Arabic (Egypt)",
        "value": "ar-EG"
    },
    {
        "label": "Persian (Iran)",
        "value": "fa-IR"
    },
    {
        "label": "Hindi (India)",
        "value": "hi-IN"
    },
    {
        "label": "Thai (Thailand)",
        "value": "th-TH"
    },
    {
        "label": "Korean (South Korea)",
        "value": "ko-KR"
    },
    {
        "label": "Chinese, Mandarin (Traditional, Taiwan)",
        "value": "cmn-Hant-TW"
    },
    {
        "label": "Chinese, Cantonese (Traditional, Hong Kong)",
        "value": "yue-Hant-HK"
    },
    {
        "label": "Japanese (Japan)",
        "value": "ja-JP"
    },
    {
        "label": "Chinese, Mandarin (Simplified, Hong Kong)",
        "value": "cmn-Hans-HK"
    },
    {
        "label": "Chinese, Mandarin (Simplified, China)",
        "value": "cmn-Hans-CN"
    },
    {
        "label": "Default",
        "value": "default"
    },
    {
        "label": "English (US)",
        "value": "en-US"
    },
    {
        "label": "English (Australian)",
        "value": "en-AU"
    },
    {
        "label": "English (Canada)",
        "value": "en-CA"
    },
    {
        "label": "English (British)",
        "value": "en-GB"
    },
    {
        "label": "English (Indian)",
        "value": "en-IN"
    },
    {
        "label": "Danish",
        "value": "da-DK"
    },
    {
        "label": "German",
        "value": "de-DE"
    },
    {
        "label": "Catalan (Spain)",
        "value": "ca-ES"
    },
    {
        "label": "Spanish (Spain)",
        "value": "es-ES"
    },
    {
        "label": "Spanish (Mexico)",
        "value": "es-MX"
    },
    {
        "label": "Finnish (Finland)",
        "value": "fi-FI"
    },
    {
        "label": "French (Canadian)",
        "value": "fr-CA"
    },
    {
        "label": "French",
        "value": "fr-FR"
    },
    {
        "label": "Italian",
        "value": "it-IT"
    },
    {
        "label": "Japanese",
        "value": "ja-JP"
    },
    {
        "label": "Korean",
        "value": "ko-KR"
    },
    {
        "label": "Norwegian",
        "value": "nb-NO"
    },
    {
        "label": "Dutch",
        "value": "nl-NL"
    },
    {
        "label": "Polish",
        "value": "pl-PL"
    },
    {
        "label": "Portuguese (Brazilian)",
        "value": "pt-BR"
    },
    {
        "label": "Portuguese (European)",
        "value": "pt-PT"
    },
    {
        "label": "Russian",
        "value": "ru-RU"
    },
    {
        "label": "Swedish",
        "value": "Sv-SE"
    },
    {
        "label": "Chinese (Mandarin)",
        "value": "zh-CN"
    },
    {
        "label": "Chinese (Cantonese)",
        "value": "zh-HK"
    },
    {
        "label": "Chinese (Taiwanese Mandarin)",
        "value": "zh-TW"
    },
    {
        "label": "English (New Zealand)",
        "value": "en-NZ"
    },
    {
        "label": "English (South African)",
        "value": "en-ZA"
    },
    {
        "label": "English (Welsh)",
        "value": "en-GB-WLS"
    },
    {
        "label": "German (Austrian)",
        "value": "de-AT"
    },
    {
        "label": "Hindi",
        "value": "hi-IN"
    },
    {
        "label": "Icelandic",
        "value": "is-IS"
    },
    {
        "label": "Romanian",
        "value": "ro-RO"
    },
    {
        "label": "Spanish (Latin American)",
        "value": "es-US"
    },
    {
        "label": "Turkish",
        "value": "tr-TR"
    },
    {
        "label": "Welsh",
        "value": "cy-GB"
    }
]

export const profanityFilters = [
  { value: 'true', label: 'True' },
  { value: 'false', label: 'False' },
];

export const speechModels = [
  { value: 'none', label: 'None' },
  { value: 'default', label: 'Dfault' },
  { value: 'numbers_and_commands', label: 'Numbers & Commands' },
  { value: 'phone_call', label: 'Phone Call' },
];

export const conditions = [
    {
        "label": "Equal To",
        "value": "equal_to"
    },
    {
        "label": "Not Equal To",
        "value": "not_equal_to"
    },
    {
        "label": "Matches Any Of",
        "value": "matches_any_of"
    },
    {
        "label": "Does Not Match Any Of",
        "value": "does_not_match_any_of"
    },
    {
        "label": "Is Blank",
        "value": "is_blank"
    },
    {
        "label": "Is Not Blank",
        "value": "is_not_blank"
    },
    {
        "label": "Regex",
        "value": "regex"
    },
    {
        "label": "Contains",
        "value": "contains"
    },
    {
        "label": "Does Not Contain",
        "value": "does_not_contain"
    },
    {
        "label": "Starts With",
        "value": "starts_with"
    },
    {
        "label": "Does Not Start With",
        "value": "does_not_start_with"
    },
    {
        "label": "Less Than",
        "value": "less_than"
    },
    {
        "label": "Greater Than",
        "value": "greater_than"
    },
    {
        "label": "Is Before Time",
        "value": "is_before_time"
    },
    {
        "label": "Is After Time",
        "value": "is_after_time"
    },
    {
        "label": "Is Before Date",
        "value": "is_before_date"
    },
    {
        "label": "Is After Date",
        "value": "is_after_date"
    }
]

export const contentTypes = [
    { value: 'application/x-www-form-urlencoded;charset=utf-8', label: 'Form URL Encoded' },
    { value: 'application/json;charset=utf-8', label: 'Application/JSON' }
]