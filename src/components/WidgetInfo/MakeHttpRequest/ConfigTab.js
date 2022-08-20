/* eslint-disable default-case */
import React, { useCallback, useState, useEffect } from 'react';
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  makeStyles
} from '@mui/styles';

import { contentTypes } from '../../WidgetLibrary/data';

const useStyles = makeStyles(() => ({
  input: {
    margin: '10px 0 !important',
    background: 'white',
    borderRadius: 3
  },
  list: {
    background: '#eee',
    width: 'calc(100% + 16px) !important',
    padding: '0 8px 15px 8px',
    boxSizing: 'border-box',
    marginTop: 10,
    marginLeft: -8,
    '& a': {
      textDecoration: 'none !important',
      cursor: 'pointer !important'
    }
  },
  typoBtn: {
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  tooltip: {
    color: 'inherit !important',
    background: 'white !important',
    boxShadow: '0px 4px 4px rgb(0 0 0 / 30%) !important',
    padding: '10px 15px !important'
  }
}));

let id = 0;
const getId = () => `${id++}`;

const ConfigTab = ({ editNode, setEditNode }) => {
  const classes = useStyles();
  const [mode, setMode] = useState(editNode.data.parameters?.length ? 'list' : 'add');
  const [editParam, setEditParam] = useState({});

  const handleChange = useCallback((value, prop) => {
    switch (prop) {
      case 'requestBody':
        setEditNode((prev) => ({
          ...prev, data: { ...prev.data, [prop]: value, contentType: contentTypes[0].value }
        }));
        break;
      default:
        setEditNode((prev) => ({
          ...prev, data: { ...prev.data, [prop]: value }
        }));
        break;
    }
  }, [setEditNode]);

  const handleClickAdd = useCallback(() => setMode('add'), []);
  const handleClickDelete = useCallback(() => {
    if (mode === 'edit') {
      setEditNode((prev) => ({
        ...prev, data: { ...prev.data, parameters: (prev.data.parameters || []).filter((parameter) => parameter.id !== editParam.id) }
      }));
    }
    setMode('list')
    setEditParam({});
  }, [editParam.id, mode, setEditNode]);
  const handleClickCancel = useCallback(() => {
    setMode('list')
    setEditParam({});
  }, []);
  const handleUpdate = useCallback(() => {
    if (!editParam.value?.trim() || !editParam.key?.trim()) return;
    if (mode === 'add') {
      setEditNode((prev) => ({
        ...prev, data: { ...prev.data, contentType: contentTypes[0].value, parameters: (prev.data.parameters || []).concat({ id: getId(), ...editParam }) }
      }));
      setEditParam({});
      setMode('list');
    }
    if (mode === 'edit') {
      setEditNode((prev) => ({
        ...prev, data: { ...prev.data, contentType: contentTypes[0].value, parameters: prev.data.parameters.map((parameter) => parameter.id !== editParam.id ? parameter : { ...editParam }) }
      }));
      setEditParam({});
      setMode('list');
    }
  }, [editParam, mode, setEditNode]);
  const handleClickEdit = useCallback((parameter) => () => {
    setEditParam(parameter);
    setMode('edit');
  }, []);

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
          <InputLabel>REQUEST METHOD</InputLabel>
          <Select
            value={editNode.data.requestMethod ?? 'GET'}
            label="REQUEST METHOD"
            onChange={(e) => handleChange(e.target.value, 'requestMethod')}
          >
            <MenuItem value="GET">GET</MenuItem>
            <MenuItem value="POST">POST</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TextField
        fullWidth size="small"
        className={classes.input}
        label={<Box>REQUEST URL <Typography color="error" style={{ display: 'inline-block' }}>*</Typography></Box>}
        variant="outlined"
        value={editNode.data.requestUrl}
        onChange={(e) => handleChange(e.target.value, 'requestUrl')}
      />
      <Box sx={{ minWidth: '100%' }}>
        <FormControl fullWidth size="small" className={classes.input}>
          <InputLabel>CONTENT TYPE</InputLabel>
          <Select
            value={editNode.data.contentType ?? contentTypes[0].value}
            label="CONTENT TYPE"
            onChange={(e) => handleChange(e.target.value, 'contentType')}
          >
            {contentTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TextField
        fullWidth size="small" className={classes.input}
        label="REQUEST BODY"
        multiline
        rows={2}
        value={editNode.data.requestBody}
        onChange={(e) => handleChange(e.target.value, 'requestBody')}
      />
      {(editNode.data.contentType === contentTypes[0].value || !editNode.data.contentType) && (
        <Box width="100%" className={classes.list}>
          <Box display="flex" justifyContent="space-between" paddingY="8px">
            <Typography>Http Parameters</Typography>
            {mode === 'list' && <Typography onClick={handleClickAdd} color="primary" className={classes.typoBtn}>Add</Typography>}
            {mode !== 'list' && <Typography onClick={handleClickDelete} color="error" className={classes.typoBtn}>Delete</Typography>}
          </Box>
          {mode !== 'list' && (
            <>
              <TextField
                fullWidth size="small"
                className={classes.input}
                label="Key"
                variant="outlined"
                value={editParam.key || ''}
                onChange={(e) => setEditParam((prev) => ({ ...prev, key: e.target.value }))}
              />
              <TextField
                fullWidth size="small"
                className={classes.input}
                label="Value"
                variant="outlined"
                value={editParam.value || ''}
                onChange={(e) => setEditParam((prev) => ({ ...prev, value: e.target.value }))}
              />
              <Box display="flex" justifyContent="space-between">
                <Typography className={classes.typoBtn} onClick={handleClickCancel}>Cancel</Typography>
                <Typography className={classes.typoBtn} onClick={handleUpdate}>{mode === 'add' ? 'Add Parameter' : 'Save'}</Typography>
              </Box>
            </>
          )}
          {mode === 'list' && (
            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>KEY</TableCell>
                    <TableCell>VALUE</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!editNode.data.parameters?.length && <Typography textAlign="center" color="sencondary">(Empty)</Typography>}
                  {editNode.data.parameters?.map((parameter) => (
                    <TableRow
                      key={parameter.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>
                        {parameter.key}
                      </TableCell>
                      <TableCell>
                        {parameter.value}
                      </TableCell>
                      <TableCell><Typography className={classes.typoBtn} onClick={handleClickEdit(parameter)}>Edit</Typography></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
      <Box pb={2} />
    </Box>
  );
};

export default ConfigTab;
