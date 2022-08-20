import React from 'react';

import {
  ArrowDropDown as ExpandMoreIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ExpandMore = styled(ExpandMoreIcon)(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default ExpandMore;