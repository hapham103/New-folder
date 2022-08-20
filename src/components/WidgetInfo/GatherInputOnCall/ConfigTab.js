/* eslint-disable default-case */
import React, { useCallback, useMemo } from 'react';
import {
  TextField,
  Select,
  Autocomplete,
  Switch,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider
} from '@mui/material';
import {
  makeStyles
} from '@mui/styles';

import { ExpandMoreIcon } from '../../icons/index';
import { languages, speechRecognitionLanguages, profanityFilters } from '../../WidgetLibrary/data';

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

const ConfigTab = ({ editNode, setEditNode, transitions }) => {
  const classes = useStyles();
  const [openAdvancedSeechSettings, setOpenAdvancedSeechSettings] = React.useState(false);
  const handleClickAdvancedSeechSettings = useCallback(() => {
    setOpenAdvancedSeechSettings((prev) => !prev);
  }, []);
  const handleChange = useCallback((value, prop) => {
    switch (prop) {
      case 'loop': case 'timeout': case 'digitLimit':
        setEditNode((prev) => ({
          ...prev, data: { ...prev.data, [prop]: parseInt(value, 10) }
        }));
        break;
      case 'stopGatheringKeyPress':
        if (value?.length > 1) break;
        setEditNode((prev) => ({
          ...prev, data: { ...prev.data, [prop]: value }
        }));
        break;
      case 'say': case 'play':
        setEditNode((prev) => ({
          ...prev, data: { ...prev.data, [prop]: value, sayOrPlay: prop }
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
          <InputLabel id="say_or_play">SAY OR PLAY MESSAGE</InputLabel>
          <Select
            labelId="say_or_play"
            id="demo-say_or_play-select"
            value={editNode.data.sayOrPlay ?? 'say'}
            label="SAY OR PLAY MESSAGE"
            onChange={(e) => handleChange(e.target.value, 'sayOrPlay')}
          >
            <MenuItem value="say">Say a message</MenuItem>
            <MenuItem value="play">Play a message</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {(editNode.data.sayOrPlay === 'say' || !editNode.data.sayOrPlay) && (
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
      {editNode.data.sayOrPlay === 'play' && (
        <TextField
          fullWidth size="small" className={classes.input}
          id="outlined-multiline-static"
          label="URL OF AUDIO FILE"
          value={editNode.data.play ?? ''}
          onChange={(e) => handleChange(e.target.value, 'play')}
        />
      )}
      {(editNode.data.sayOrPlay === 'say' || !editNode.data.sayOrPlay) && (
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
      {(editNode.data.sayOrPlay === 'say' || !editNode.data.sayOrPlay) && (
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
      <TextField
        fullWidth size="small" className={classes.input}
        id="outlined-multiline-static"
        label="NUMBER OF LOOPS"
        inputProps={{
          type: 'number',
          step: 1,
          min: 1
        }}
        value={editNode.data.loop ?? 1}
        onChange={(e) => handleChange(e.target.value, 'loop')}
      />
      <Box width="100%" display="flex" alignItems="center">
        <TextField
          size="small" className={`${classes.input} ${classes.stopGateringInput}`}
          id="outlined-multiline-static"
          label="STOP GATHERING AFTER"
          inputProps={{
            type: 'number',
            step: 1,
            min: 0
          }}
          value={editNode.data.timeout ?? 5}
          onChange={(e) => handleChange(e.target.value, 'timeout')}
        />
        <span className={classes.seconds}>SECONDS</span>
      </Box>
      <Box width="100%" mt={1}>
        <FormControl fullWidth size="small">
          <div className={classes.stopGatheringOnKeyPressLabel} id="say_or_play">STOP GATHERING ON KEYPRESS?</div>
          <Switch checked={editNode.data.stopGatheringOnKeyPress ?? true} onChange={(e) => handleChange(e.target.checked, 'stopGatheringOnKeyPress')} size="small" />
          {(editNode.data.stopGatheringOnKeyPress ?? true) && (
            <TextField
              size="small" className={`${classes.input}`}
              value={editNode.data.stopGatheringKeyPress ?? '#'}
              onChange={(e) => handleChange(e.target.value, 'stopGatheringKeyPress')}
            />
          )}
        </FormControl>
      </Box>
      <Box width="100%" display="flex" alignItems="center">
        <TextField
          size="small" className={`${classes.input} ${classes.stopGateringInput}`}
          label="STOP GATHERING AFTER"
          inputProps={{
            type: 'number',
            step: 1,
            min: 0
          }}
          value={editNode.data.digitLimit ?? 5}
          onChange={(e) => handleChange(e.target.value, 'digitLimit')}
        />
        <span className={classes.seconds}>DIGITS</span>
      </Box>
      <Autocomplete
        freeSolo
        getOptionLabel={(option) => option.label || ""}
        disablePortal
        fullWidth
        size="small"
        className={classes.input}
        value={editNode.data.speechRecognitionLanguage ?? speechRecognitionLanguages[0].value}
        onChange={(e, v) => handleChange(v, 'speechRecognitionLanguage')}
        options={speechRecognitionLanguages}
        renderInput={(params) => <TextField {...params} label="SPEECH RECOGNITION LANGUAGE" />}
      />
      <TextField
        fullWidth size="small" className={classes.input}
        label="SPEECH RECOGNITION HINTS"
        value={editNode.data.speechRecognitionHints ?? ''}
        placeholder="Enter comma sperated hints"
        onChange={(e) => handleChange(e.target.value, 'speechRecognitionHints')}
      />
      <Autocomplete
        freeSolo
        getOptionLabel={(option) => option.label || ""}
        disablePortal
        fullWidth
        size="small"
        className={classes.input}
        value={editNode.data.profanityFilter ?? profanityFilters[0].value}
        onChange={(e, v) => handleChange(v, 'profanityFilter')}
        id="combo-box-demo"
        options={profanityFilters}
        renderInput={(params) => <TextField {...params} label="PROFANITY FILTER" />}
      />
      <Box pb={2}></Box>
      {editNode.data.sayOrPlay === 'play' && (
        <Box width="100%" className={classes.advancedSeechSettings}>
          <ListItemButton onClick={handleClickAdvancedSeechSettings}>
            <ListItemText primary="ADVANCED SPEECH SETTINGS" />
            <ExpandMoreIcon
              expand={openAdvancedSeechSettings}
            />
          </ListItemButton>
          <Collapse in={openAdvancedSeechSettings} timeout="auto" unmountOnExit>
            <Divider style={{ marginBottom: 10 }} />
            <TextField
              fullWidth size="small" className={classes.input}
              label="SPEECH TIMEOUT (IN SECONDS)"
              value={editNode.data.speechTimeout ?? 'auto'}
              onChange={(e) => handleChange(e.target.value, 'speechTimeout')}
            />
            <Autocomplete
              freeSolo
              getOptionLabel={(option) => option.label || ""}
              disablePortal
              fullWidth
              size="small"
              className={classes.input}
              value={editNode.data.speechModel || ''}
              onChange={(e, v) => handleChange(v, 'speechModel')}
              options={[{ label: 'None', value: 'none' }, { label: 'Default', value: 'default' }, { label: 'Numbers and Commands', value: 'numbersAndCommands' }, { label: 'Phone Call', value: 'phoneCall' }]}
              renderInput={(params) => <TextField {...params} label="SPEECH MODEL" />}
            />
          </Collapse>
        </Box>
      )}
      <Box pb={2} />
    </Box>
  );
};

export default ConfigTab;
