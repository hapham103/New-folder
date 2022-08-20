/* eslint-disable default-case */
import React, { useCallback, useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Tooltip,
  Switch,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider, Typography,
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

const useStyles = makeStyles(() => ({
  input: {
    margin: '10px 0 !important',
    borderRadius: 3,
    background: 'white',
  },
  list: {
    background: '#e6e6e6',
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

const ConfigTab = ({ editNode, setEditNode, transitions }) => {
  const classes = useStyles();
  const [mode, setMode] = useState(editNode.data.variables?.length ? 'list' : 'add');
  const [editVar, setEditVar] = useState({});

  const handleChange = useCallback((value, prop) => {
    switch (prop) {
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
        ...prev, data: { ...prev.data, variables: (prev.data.variables || []).filter((variable) => variable.id !== editVar.id) }
      }));
    }
    setMode('list')
    setEditVar({});
  }, [editVar.id, mode, setEditNode]);
  const handleClickCancel = useCallback(() => {
    setMode('list')
    setEditVar({});
  }, []);
  const handleUpdate = useCallback(() => {
    if (!editVar.value?.trim() || !editVar.key?.trim()) return;
    if (mode === 'add') {
      setEditNode((prev) => ({
        ...prev, data: { ...prev.data, variables: (prev.data.variables || []).concat({ id: getId(), ...editVar }) }
      }));
      setEditVar({});
      setMode('list');
    }
    if (mode === 'edit') {
      setEditNode((prev) => ({
        ...prev, data: { ...prev.data, variables: prev.data.variables.map((variable) => variable.id !== editVar.id ? variable : { ...editVar }) }
      }));
      setEditVar({});
      setMode('list');
    }
  }, [editVar, mode, setEditNode]);
  const handleClickEdit = useCallback((variable) => () => {
    setEditVar(variable);
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
      <Box width="100%" className={classes.list}>
        <Box display="flex" justifyContent="space-between" paddingY="8px">
          <Typography>Variables</Typography>
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
              value={editVar.key || ''}
              onChange={(e) => setEditVar((prev) => ({ ...prev, key: e.target.value }))}
            />
            <TextField
              fullWidth size="small"
              className={classes.input}
              label="Value"
              variant="outlined"
              value={editVar.value || ''}
              onChange={(e) => setEditVar((prev) => ({ ...prev, value: e.target.value }))}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography className={classes.typoBtn} onClick={handleClickCancel}>Cancel</Typography>
              <Typography className={classes.typoBtn} onClick={handleUpdate}>{mode === 'add' ? 'Add Variable' : 'Save'}</Typography>
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
                {!editNode.data.variables?.length && <Typography textAlign="center" color="sencondary">(Empty)</Typography>}
                {editNode.data.variables?.map((variable) => (
                  <TableRow
                    key={variable.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      {variable.key}
                    </TableCell>
                    <TableCell>
                      <Tooltip placement="top" classes={{ tooltip: classes.tooltip }} title={variable.value}>
                        <Typography variant="body2" color="primary" className={classes.typoBtn}>View</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell><Typography className={classes.typoBtn} onClick={handleClickEdit(variable)}>Edit</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Box pb={2} />
    </Box>
  );
};

export default ConfigTab;
