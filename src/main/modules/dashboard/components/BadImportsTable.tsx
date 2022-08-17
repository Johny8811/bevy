import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { head } from 'lodash';
import { CreateRecipientProps } from '@onfleet/node-onfleet/Resources/Recipients';
import { CreateDestinationProps } from '@onfleet/node-onfleet/Resources/Destinations';
import { format } from 'date-fns';

import { isDev } from '../../../utils/isDev';
import { CreateBatchTasksErrors } from '../../../types/tasks';

const taskColumns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 150, editable: true },
  { field: 'phoneNumber', headerName: 'Phone number', width: 120, editable: true },
  {
    field: 'skipSMSNotifications',
    headerName: 'Notification',
    width: 100,
    type: 'boolean',
    editable: true
  },
  { field: 'recipientNotes', headerName: 'Customer Notes', width: 250, editable: true },
  { field: 'street', headerName: 'Street', width: 150, editable: true },
  { field: 'number', headerName: 'House number', width: 120, editable: true },
  { field: 'city', headerName: 'City', width: 120, editable: true },
  { field: 'postalCode', headerName: 'Postal code', width: 120, editable: true },
  { field: 'country', headerName: 'Country', width: 150, editable: true },
  { field: 'completeAfter', headerName: 'Deliver after', width: 150, editable: true },
  { field: 'completeBefore', headerName: 'Deliver before', width: 150, editable: true },
  { field: 'quantity', headerName: 'Quantity', width: 100, editable: true }
];

type Props = {
  importedCount?: number;
  failedTasks: CreateBatchTasksErrors[] | undefined;
};

export function BadImportsTable({ importedCount = 0, failedTasks }: Props) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<any>();

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (failedTasks && failedTasks.length > 0) {
      const failedTasksRows = failedTasks.map((failedTask, index) => {
        // FIXME: improve this types!
        const recipient = head(failedTask.task.recipients as CreateRecipientProps[]);
        const { address } = failedTask.task.destination as CreateDestinationProps;

        return {
          id: index,
          name: recipient?.name,
          phoneNumber: recipient?.phone,
          skipSMSNotifications: recipient?.skipSMSNotifications,
          recipientNotes: recipient?.notes,
          street: address.street,
          number: address.number,
          city: address.city,
          postalCode: address.postalCode,
          country: address.country,
          completeAfter:
            failedTask.task.completeAfter &&
            format(new Date(failedTask.task.completeAfter), 'dd.MM.yyyy hh:mm'),
          completeBefore:
            failedTask.task.completeBefore &&
            format(new Date(failedTask.task.completeBefore), 'dd.MM.yyyy hh:mm'),
          quantity: failedTask.task.quantity
        };
      });

      setRows(failedTasksRows);
      setOpen(true);
    }
  }, [failedTasks]);

  return (
    <div>
      {isDev() && (
        <Button variant="contained" onClick={handleClickOpen()}>
          Open bad imports dialog
        </Button>
      )}
      <Dialog
        open={open}
        scroll="paper"
        fullWidth
        maxWidth="xl"
        aria-labelledby="scroll-dialog-title">
        <DialogTitle id="scroll-dialog-title">
          <>
            We couldn&apos;t import some tasks ({failedTasks?.length}), please fix it. Successfully
            imported tasks: {importedCount}
          </>
        </DialogTitle>
        <DialogContent>
          <DataGrid
            rows={rows}
            columns={taskColumns}
            disableSelectionOnClick
            autoHeight
            hideFooter
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>
            Import fixed tasks
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
