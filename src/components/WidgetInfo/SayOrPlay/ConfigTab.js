/* eslint-disable default-case */
import React, { useCallback, useMemo } from 'react';
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
} from '@mui/material';
import {
  makeStyles
} from '@mui/styles';

import { languages } from '../../WidgetLibrary/data'

const useStyles = makeStyles(() => ({
  input: {
    margin: '10px 0 !important',
    background: 'white',
    borderRadius: 3
  },
  stopGateringInput: {
    width: 160
  },
  seconds: {
    marginLeft: 5,
    fontSize: 11
  },
  stopGatheringOnKeyPressLabel: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 12
  },
  advancedSeechSettings: {
    background: '#e6e6e6',
    width: 'calc(100% + 16px) !important',
    marginLeft: -8,
    padding: '0 8px',
    boxSizing: 'border-box'
  }
}));

const ConfigTab = ({ editNode, setEditNode }) => {
  const classes = useStyles();
  const handleChange = useCallback((value, prop) => {
    switch (prop) {
      case 'say': case 'play': case 'digit':
        setEditNode((prev) => ({
          ...prev, data: { ...prev.data, [prop]: value, sayOrPlayOrDigit: prop }
        }));
        break;
      case 'loop':
        setEditNode((prev) => ({
          ...prev, data: { ...prev.data, [prop]: parseInt(value, 10) }
        }));
        break;
      default:
        setEditNode((prev) => ({
          ...prev, data: { ...prev.data, [prop]: value }
        }));
        break;
    }
  }, [setEditNode]);

  const voices = useMemo(() => {
    const currL = languages.find((l) => l.value === editNode.data.language);
    if (!currL) return [];
    return currL.voices;
  }, [editNode.data.language]);

  return (
    <Box maxHeight="100%" overFlow="auto">
      <TextField
        fullWidth size="small"
        className={classes.input}
        label="WIDGET NAME"
        variant="outlined"
        value={editNode.data.label}
        onChange={(e) => handleChange(e.target.value, 'label')}
      />
      <Box sx={{ minWidth: '100%' }}>
        <FormControl fullWidth size="small" className={classes.input}>
          <InputLabel id="say_or_play">SAY OR PLAY MESSAGE OR DIGITS</InputLabel>
          <Select
            labelId="say_or_play"
            id="demo-say_or_play-select"
            value={editNode.data.sayOrPlayOrDigit ?? 'say'}
            label="SAY OR PLAY MESSAGE OR DIGITS"
            onChange={(e) => handleChange(e.target.value, 'sayOrPlayOrDigit')}
          >
            <MenuItem value="say">Say a message</MenuItem>
            <MenuItem value="play">Play a message</MenuItem>
            <MenuItem value="digit">Digits</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {(editNode.data.sayOrPlayOrDigit === 'say' || !editNode.data.sayOrPlayOrDigit) && (
        <TextField
          fullWidth size="small" className={classes.input}
          id="outlined-multiline-static"
          label="Text to say"
          multiline
          rows={2}
          value={editNode.data.say ?? ''}
          onChange={(e) => handleChange(e.target.value, 'say')}
        />
      )}
      {editNode.data.sayOrPlayOrDigit === 'play' && (
        <TextField
          fullWidth size="small" className={classes.input}
          id="outlined-multiline-static"
          label="URL OF AUDIO FILE"
          value={editNode.data.play ?? ''}
          onChange={(e) => handleChange(e.target.value, 'play')}
        />
      )}
      {(editNode.data.sayOrPlayOrDigit === 'say' || !editNode.data.sayOrPlayOrDigit) && (
        <Box sx={{ minWidth: '100%' }}>
          <FormControl fullWidth size="small" className={classes.input}>
            <InputLabel id="say_or_play">LANGUAGE</InputLabel>
            <Select
              labelId="language"
              id="language"
              value={editNode.data.language ?? languages[0].value}
              label="LANGUAGE"
              onChange={(e) => handleChange(e.target.value, 'language')}
            >
              {languages.map((language) => (
                <MenuItem key={language.value} value={language.value}>{language.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      {(editNode.data.sayOrPlayOrDigit === 'say' || !editNode.data.sayOrPlayOrDigit) && (
        <Box sx={{ minWidth: '100%' }}>
          <FormControl fullWidth size="small" className={classes.input}>
            <InputLabel id="say_or_play">MESSAGE VOICE</InputLabel>
            <Select
              labelId="messageVoice"
              id="messageVoice"
              value={editNode.data.messageVoice ?? (voices[0]?.value || '')}
              label="MESSAGE VOICE"
              onChange={(e) => handleChange(e.target.value, 'messageVoice')}
            >
              {voices?.map((voice) => (
                <MenuItem key={voice.value} value={voice.value}>{voice.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      {editNode.data.sayOrPlayOrDigit === 'digit' && (
        <TextField
          fullWidth size="small" className={classes.input}
          label="DIGITS"
          value={editNode.data.digit ?? ''}
          onChange={(e) => handleChange(e.target.value, 'digit')}
        />
      )}
      <TextField
        fullWidth size="small" className={classes.input}
        label="NUMBER OF LOOPS"
        inputProps={{
          type: 'number',
          step: 1,
          min: 1
        }}
        value={editNode.data.loop ?? 1}
        onChange={(e) => handleChange(e.target.value, 'loop')}
      />
      <Box pb={2} />
    </Box>
  );
};

export default ConfigTab;
