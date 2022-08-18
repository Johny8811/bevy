import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Props as TableProps } from './Table';

export function TableFooter({ onConfirm, onCancel }: Omit<TableProps, 'failedTasks'>) {
  return (
    <Box sx={{ p: 1, display: 'flex', justifyContent: 'end' }}>
      <Button onClick={onCancel} sx={{ mx: 1 }}>
        Cancel
      </Button>
      <Button variant="contained" onClick={onConfirm}>
        Import fixed tasks
      </Button>
    </Box>
  );
}
