import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';

import { formatToDateAndTime, formatToTime } from '../../../utils/formatDates';
import { valueOrDash } from '../../../utils/valueOrDash';
import { OurOnFleetTask } from '../../../types/tasks';
import { OnFleetWorker } from '../../../types/workers';

export const BAD_IMPORTS_COLUMNS: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 250, editable: true },
  { field: 'phoneNumber', headerName: 'Phone number', width: 150, editable: true },
  {
    field: 'skipSMSNotifications',
    headerName: 'Notification',
    width: 100,
    type: 'boolean',
    editable: true
  },
  { field: 'recipientNotes', headerName: 'Customer Notes', width: 250, editable: true },
  { field: 'street', headerName: 'Street', width: 150, editable: true },
  { field: 'houseNumber', headerName: 'House number', width: 120, editable: true },
  { field: 'city', headerName: 'City', width: 120, editable: true },
  { field: 'postalCode', headerName: 'Postal code', width: 120, editable: true },
  { field: 'country', headerName: 'Country', width: 150, editable: true },
  { field: 'completeAfter', headerName: 'Deliver after', width: 150, editable: true },
  { field: 'completeBefore', headerName: 'Deliver before', width: 150, editable: true },
  { field: 'quantity', headerName: 'Quantity', width: 100, editable: true }
];

export const DELIVERY_COLUMNS: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 250,
    // TODO: use OurOnFleetTask['...'] for typing
    valueFormatter: ({ value }: GridValueFormatterParams<string>) => valueOrDash(value)
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone number',
    width: 150,
    // TODO: use OurOnFleetTask['...'] for typing
    valueFormatter: ({ value }: GridValueFormatterParams<string>) => valueOrDash(value)
  },
  {
    field: 'recipientNotes',
    headerName: 'Customer Notes',
    width: 250,
    // TODO: use OurOnFleetTask['...'] for typing
    valueFormatter: ({ value }: GridValueFormatterParams<string>) => valueOrDash(value)
  },
  { field: 'street', headerName: 'Street', width: 150 },
  { field: 'city', headerName: 'City', width: 150 },
  { field: 'postalCode', headerName: 'Postal code', width: 120 },
  { field: 'country', headerName: 'Country', width: 150 },
  {
    field: 'workerName',
    headerName: 'Worker name',
    width: 150,
    valueFormatter: ({ value }: GridValueFormatterParams<OnFleetWorker['name']>) =>
      valueOrDash(value)
  },
  {
    field: 'workerPhone',
    headerName: 'Worker phone',
    width: 150,
    valueFormatter: ({ value }: GridValueFormatterParams<OnFleetWorker['phone']>) =>
      valueOrDash(value)
  },
  /*
  // will be implemented
  { field: 'payment', headerName: 'payment', width: 100 },
  { field: 'cashOnDeliver', headerName: 'Cash on deliver', width: 100 },
  { field: 'internalOrderNo', headerName: 'Internal order no', width: 100 },
  */
  {
    field: 'estimatedArrivalTime',
    headerName: 'Estimated arrival time',
    width: 200,
    valueFormatter: ({ value }: GridValueFormatterParams<OurOnFleetTask['estimatedArrivalTime']>) =>
      valueOrDash(value, (v) => formatToDateAndTime(v))
  },
  {
    field: 'completeAfter',
    headerName: 'Deliver after',
    width: 150,
    valueFormatter: ({ value }: GridValueFormatterParams<OurOnFleetTask['completeAfter']>) =>
      formatToDateAndTime(value)
  },
  {
    field: 'completeBefore',
    headerName: 'Deliver before',
    width: 150,
    valueFormatter: ({ value }: GridValueFormatterParams<OurOnFleetTask['completeBefore']>) =>
      formatToDateAndTime(value)
  },
  { field: 'quantity', headerName: 'Quantity', width: 100 },
  {
    field: 'estimatedArrivalTime',
    headerName: 'Estimated arrival time',
    width: 200,
    valueFormatter: ({ value }: GridValueFormatterParams<OurOnFleetTask['estimatedArrivalTime']>) =>
      valueOrDash(value, (v) => formatToDateAndTime(v))
  },
  { field: 'order', headerName: 'Order', width: 100 },
  {
    field: 'slot',
    headerName: 'Slot',
    width: 150,
    // TODO: type GridValueGetterParams
    valueGetter: ({ row }) =>
      valueOrDash(row.slot, (slot) => `${formatToTime(slot.start)} - ${formatToTime(slot.end)}`)
  },
  {
    field: 'deliveredAt',
    headerName: 'Delivered at',
    width: 150,
    valueFormatter: ({
      value
    }: GridValueFormatterParams<OurOnFleetTask['completionDetails']['time']>) =>
      valueOrDash(value, (v) => formatToDateAndTime(v))
  }
  /*
  // will be implemented
  { field: 'payment', headerName: 'payment', width: 100 },
  { field: 'cashOnDeliver', headerName: 'Cash on deliver', width: 100 },
  { field: 'internalOrderNo', headerName: 'Internal order no', width: 100 },
  */
];
