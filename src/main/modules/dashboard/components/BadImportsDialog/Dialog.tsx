import Button from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import React, { useEffect, useState } from 'react';

import { TaskData, CreateBatchTasksErrors } from '../../../../types/tasks';
import { isDev } from '../../../../utils/isDev';
import { Table } from './Table';

type Props = {
  importedCount?: number;
  failedTasks: CreateBatchTasksErrors[] | undefined;
  onImportFixedTasks: (data: TaskData[]) => void;
};

export function Dialog({ importedCount = 0, failedTasks, onImportFixedTasks }: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (window.confirm('Are you sure, you want to leave? Your changes will be lost.')) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (failedTasks && failedTasks.length > 0) {
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
      <MuiDialog
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
          {failedTasks && (
            <Table
              failedTasks={failedTasks}
              onCancel={handleClose}
              onConfirm={onImportFixedTasks}
            />
          )}
        </DialogContent>
      </MuiDialog>
    </div>
  );
}
