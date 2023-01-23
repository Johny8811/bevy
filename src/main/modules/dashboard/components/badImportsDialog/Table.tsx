import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { head } from 'lodash';

import { CreateTaskProps, CreateBatchTasksErrors } from '../../../../types/tasks';
import { formatToDateAndTime } from '../../../../utils/formatDates';
import { BAD_IMPORTS_COLUMNS } from '../../constants/columns';
import { TableFooter } from './TableFooter';

export type Props = {
  failedTasks: CreateBatchTasksErrors[];
  onCancel: () => void;
  onConfirm: (tasks: CreateTaskProps[]) => void;
};

export function Table({ failedTasks, onCancel, onConfirm }: Props) {
  // FIXME: type correctly
  const [rows, setRows] = useState<any>();

  useEffect(() => {
    const failedTasksRows = failedTasks.map((failedTask, index) => {
      // FIXME: improve this types!
      const recipient = head(failedTask.task.recipients);
      const { address } = failedTask.task.destination;

      return {
        id: index,
        name: recipient?.name,
        phoneNumber: recipient?.phone,
        skipSMSNotifications: recipient?.skipSMSNotifications,
        recipientNotes: recipient?.notes,
        street: address.street,
        houseNumber: address.number,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country,
        completeAfter:
          failedTask.task.completeAfter && formatToDateAndTime(failedTask.task.completeAfter),
        completeBefore:
          failedTask.task.completeBefore && formatToDateAndTime(failedTask.task.completeBefore),
        quantity: failedTask.task.quantity,
        pickupTask: failedTask.task.pickupTask
      };
    });

    setRows(failedTasksRows);
  }, [failedTasks]);

  if (!rows) {
    return null;
  }

  return (
    <DataGrid
      rows={rows}
      columns={BAD_IMPORTS_COLUMNS}
      disableSelectionOnClick
      autoHeight
      components={{ Footer: TableFooter }}
      componentsProps={{
        footer: {
          onCancel,
          onConfirm
        }
      }}
    />
  );
}
