import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { head } from 'lodash';
import { CreateRecipientProps } from '@onfleet/node-onfleet/Resources/Recipients';
import { CreateDestinationProps } from '@onfleet/node-onfleet/Resources/Destinations';

import { TaskData, CreateBatchTasksErrors } from '../../../../types/tasks';
import { formatToDateAndTime } from '../../../../utils/formatDates';
import { BAD_IMPORTS_COLUMNS } from '../../constants/columns';
import { TableFooter } from './TableFooter';

export type Props = {
  failedTasks: CreateBatchTasksErrors[];
  onCancel: () => void;
  onConfirm: (tasks: TaskData[]) => void;
};

export function Table({ failedTasks, onCancel, onConfirm }: Props) {
  // FIXME: type correctly
  const [rows, setRows] = useState<any>();

  useEffect(() => {
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
        houseNumber: address.number,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country,
        completeAfter:
          failedTask.task.completeAfter && formatToDateAndTime(failedTask.task.completeAfter),
        completeBefore:
          failedTask.task.completeBefore && formatToDateAndTime(failedTask.task.completeBefore),
        quantity: failedTask.task.quantity
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