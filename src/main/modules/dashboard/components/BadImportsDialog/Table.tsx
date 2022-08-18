import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { head } from 'lodash';
import { format } from 'date-fns';
import { CreateRecipientProps } from '@onfleet/node-onfleet/Resources/Recipients';
import { CreateDestinationProps } from '@onfleet/node-onfleet/Resources/Destinations';

import { CreateBatchTasksErrors } from '../../../../types/tasks';
import { TASK_COLUMNS } from '../../constants';
import { TableFooter } from './TableFooter';

export type Props = {
  failedTasks: CreateBatchTasksErrors[];
  onCancel: () => void;
  // TODO: optimise this, move to separated file
  onConfirm: (
    data: {
      name: string;
      phoneNumber: string;
      skipSMSNotifications: boolean | undefined;
      recipientNotes: string | undefined;
      street: string;
      number: string;
      city: string;
      postalCode: string | undefined;
      country: string;
      completeAfter: number | undefined;
      completeBefore: number | undefined;
      quantity: number | undefined;
    }[]
  ) => void;
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
    <DataGrid
      rows={rows}
      columns={TASK_COLUMNS}
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
