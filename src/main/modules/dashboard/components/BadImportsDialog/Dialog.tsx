import Button from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import React, { useEffect, useState } from 'react';

import { TaskData, CreateBatchTasksErrors } from '../../../../types/tasks';
import { isDev } from '../../../../utils/isDev';
import { Table } from './Table';
// TODO: improve development
import { EXAMPLE_IMPORT_ERRORS } from './devTableData';

export type Props = {
  importedCount?: number;
  failedTasks: CreateBatchTasksErrors[] | undefined;
  onImportFixedTasks: (tasks: TaskData[]) => void;
};

export function Dialog({ importedCount = 0, failedTasks, onImportFixedTasks }: Props) {
  const [open, setOpen] = useState(isDev());

  useEffect(() => {
    if (failedTasks && failedTasks.length > 0) {
      setOpen(true);
    }
  }, [failedTasks]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (window.confirm('Are you sure, you want to leave? Your changes will be lost.')) {
      setOpen(false);
    }
  };

  const handleOnConfirm = (tasks: TaskData[]) => {
    setOpen(false);
    onImportFixedTasks(tasks);
  };

  return (
    <div>
      {isDev() && (
        <Button variant="contained" onClick={handleClickOpen}>
          Open bad imports dialog
        </Button>
      )}
      <MuiDialog
        open={open}
        scroll="paper"
        fullWidth
        maxWidth="xl"
        aria-labelledby="scroll-dialog-title">
        <DialogTitle id="scroll-dialog-title">
          Failed to import tasks: {failedTasks?.length}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Successfully imported tasks: {importedCount}.</DialogContentText>
          <DialogContentText>
            Mandatory fields:{' '}
            <i>Name, Phone number, Notifications, Street, House number, City, Country</i>
          </DialogContentText>
          {isDev() && (
            <Table
              failedTasks={EXAMPLE_IMPORT_ERRORS}
              onCancel={handleClose}
              onConfirm={handleOnConfirm}
            />
          )}
          {failedTasks && (
            <Table failedTasks={failedTasks} onCancel={handleClose} onConfirm={handleOnConfirm} />
          )}
        </DialogContent>
      </MuiDialog>
    </div>
  );
}
