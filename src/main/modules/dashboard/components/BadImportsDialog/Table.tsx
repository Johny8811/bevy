import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { head } from 'lodash';
import { CreateRecipientProps } from '@onfleet/node-onfleet/Resources/Recipients';
import { CreateDestinationProps } from '@onfleet/node-onfleet/Resources/Destinations';
import { format } from 'date-fns';
import { TASK_COLUMNS } from '../../constants';
import { CreateBatchTasksErrors } from '../../../../types/tasks';

type Props = {
  failedTasks: CreateBatchTasksErrors[];
};

export function Table({ failedTasks }: Props) {
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
  }, [failedTasks]);

  if (!rows) {
    return null;
  }

  return (
    <DataGrid rows={rows} columns={TASK_COLUMNS} disableSelectionOnClick autoHeight hideFooter />
  );
}