import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useGridApiContext } from '@mui/x-data-grid';

import { getGridData } from '../../../../utils/dataGrid/getGridData';
import { badImportsValidationSchema } from '../../validation/validationSchema';
import { Props as TableProps } from './Table';

export function TableFooter({ onConfirm, onCancel }: Omit<TableProps, 'failedTasks'>) {
  const apiRef = useGridApiContext();
  const data = getGridData(apiRef);
  // TODO: cell should be "date" type
  const transformData = data.map((d) => {
    return {
      ...d,
      completeAfter: new Date(d.completeAfter).getTime(),
      completeBefore: new Date(d.completeBefore).getTime()
    };
  });

  return (
    <Box sx={{ p: 1, display: 'flex', justifyContent: 'end' }}>
      <Button onClick={onCancel} sx={{ mx: 1 }}>
        Cancel
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          badImportsValidationSchema
            .validate(transformData)
            .then((validationResult) => {
              if (validationResult) {
                onConfirm(validationResult);
              }
            })
            .catch((e) => {
              console.log('=-=> validation ERRor: ', e);
            });
        }}>
        Import fixed tasks
      </Button>
    </Box>
  );
}
