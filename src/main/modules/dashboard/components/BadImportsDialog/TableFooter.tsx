import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useGridApiContext } from '@mui/x-data-grid';

import { getGridData } from '../../../../utils/dataGrid/getGridData';
import { Props as TableProps } from './Table';

export function TableFooter({ onConfirm, onCancel }: Omit<TableProps, 'failedTasks'>) {
  const apiRef = useGridApiContext();
  const data = getGridData(apiRef);

  return (
    <Box sx={{ p: 1, display: 'flex', justifyContent: 'end' }}>
      <Button onClick={onCancel} sx={{ mx: 1 }}>
        Cancel
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          // TODO: add validation
          // @ts-ignore
          onConfirm(data);
        }}>
        Import fixed tasks
      </Button>
    </Box>
  );
}
