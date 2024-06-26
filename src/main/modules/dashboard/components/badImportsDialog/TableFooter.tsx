import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useGridApiContext } from '@mui/x-data-grid';

import { getGridData } from '../../../../utils/dataGrid/getGridData';
import { isDev } from '../../../../utils/isDev';
import { useSnackBar } from '../../../../components/snackBar/SnackbarProvider';
import { badImportsValidationSchema } from '../../validation/validationSchema';
import { Props as TableProps } from './Table';

export function TableFooter({ onConfirm, onCancel }: Omit<TableProps, 'failedTasks'>) {
  const { openSnackBar } = useSnackBar();
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
          // TODO: validation shouldn't be here, move to hook
          badImportsValidationSchema
            .validate(transformData)
            .then((validationResult) => {
              if (validationResult) {
                // TODO: if in some weird universe, this frontend will be used for BEVY, this
                //  has to be rewritten
                onConfirm(
                  validationResult.map((result) => ({
                    recipients: [
                      {
                        name: result.name,
                        phone: result.phoneNumber,
                        notes: result.recipientNotes,
                        skipSMSNotifications: result.skipSMSNotifications
                      }
                    ],
                    destination: {
                      address: {
                        number: result.houseNumber,
                        street: result.street,
                        city: result.city,
                        postalCode: result.postalCode,
                        country: result.country
                      }
                    },
                    completeAfter: result.completeAfter,
                    completeBefore: result.completeBefore,
                    quantity: result.quantity,
                    pickupTask: false
                  }))
                );
              }
            })
            .catch((validationError) => {
              if (isDev()) {
                // TODO: implement logger!
                // eslint-disable-next-line no-console
                console.log('==> validationError: ', validationError);
              }

              openSnackBar({
                text: `Some "mandatory" fields are still missing.`,
                severity: 'error'
              });
            });
        }}>
        Import fixed tasks
      </Button>
    </Box>
  );
}
