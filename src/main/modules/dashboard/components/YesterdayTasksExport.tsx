import React from 'react';
import { ExportToCsv } from 'export-to-csv';
import Button from '@mui/material/Button';

import { formatToDateAndTime } from '../../../utils/formatDates';
import { useTasksByDayNameQuery } from '../../../queryHooks/useTasksByDayNameQuery';
import { useWorkersQueryV2 } from '../../../queryHooks/useWorkersQueryV2';
import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';

const options = {
  fieldSeparator: ',',
  filename: 'BEVY-yesterday tasks',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  showTitle: false,
  title: 'My Awesome CSV',
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true
};

const csvExporter = new ExportToCsv(options);

export function YesterdayTasksExport() {
  const { openSnackBar } = useSnackBar();
  const { data: workers, isError: isWorkersError, refetch } = useWorkersQueryV2();
  const tasksByDayNameQuery = useTasksByDayNameQuery();

  return (
    <Button
      variant="contained"
      onClick={async () => {
        if (!isWorkersError) {
          const tasks = await tasksByDayNameQuery('yesterday');

          const formatted = tasks.map((task) => ({
            'Short Id': task.shortId,
            Name: task.recipients[0]?.name || '-',
            'Phone Number': task.recipients[0]?.phone || '-',
            'Recipient Notes': task.recipients[0]?.notes || '-',
            Street: task.destination.address.street || '-',
            Number: task.destination.address.number || '-',
            City: task.destination.address.city || '-',
            'Postal Code': task.destination.address.postalCode || '-',
            Country: task.destination.address.country || '-',
            'Worker Name': workers?.find((w) => w.id === task.worker)?.name,
            'Worker Phone': workers?.find((w) => w.id === task.worker)?.phone,
            'Complete After': task.completeAfter
              ? formatToDateAndTime(task.completeAfter)
              : undefined,
            'Complete Before': task.completeBefore
              ? formatToDateAndTime(task.completeBefore)
              : undefined,
            Quantity: task.quantity,
            EstimatedArrivalTime: task.estimatedArrivalTime
              ? formatToDateAndTime(task.estimatedArrivalTime)
              : undefined,
            Order: task.order || '-',
            Slot: task.slot || '-',
            DeliveredAt: task.completionDetails.time
              ? formatToDateAndTime(task.completionDetails.time)
              : undefined
          }));

          csvExporter.generateCsv(formatted);
        } else {
          openSnackBar({
            text: `Something went wrong while getting workers data. Please try it again`,
            severity: 'error'
          });
          refetch();
        }
      }}>
      Previous day - download CSV
    </Button>
  );
}
