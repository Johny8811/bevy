import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';

import { formatToDateAndTime, formatToTime } from '../../../utils/formatDates';
import { valueOrDash } from '../../../utils/valueOrDash';
import { Task, Recipient } from '../../../types/tasks';
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

export const TASKS_TABLE_COLUMNS: GridColDef[] = [
  {
    field: 'shortId',
    headerName: 'Short Id',
    width: 150,
    valueFormatter: ({ value }: GridValueFormatterParams<Task['shortId']>) => valueOrDash(value)
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 250,
    valueFormatter: ({ value }: GridValueFormatterParams<Recipient['name']>) => valueOrDash(value)
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone number',
    width: 150,
    valueFormatter: ({ value }: GridValueFormatterParams<Recipient['phone']>) => valueOrDash(value)
  },
  {
    field: 'recipientNotes',
    headerName: 'Customer Notes',
    width: 250,
    valueFormatter: ({ value }: GridValueFormatterParams<Recipient['notes']>) => valueOrDash(value)
  },
  { field: 'street', headerName: 'Street', width: 150 },
  { field: 'houseNumber', headerName: 'House Number', width: 150 },
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
  {
    field: 'completeAfter',
    headerName: 'Deliver after',
    width: 150,
    valueFormatter: ({ value }: GridValueFormatterParams<Task['completeAfter']>) =>
      formatToDateAndTime(value)
  },
  {
    field: 'completeBefore',
    headerName: 'Deliver before',
    width: 150,
    valueFormatter: ({ value }: GridValueFormatterParams<Task['completeBefore']>) =>
      formatToDateAndTime(value)
  },
  { field: 'quantity', headerName: 'Quantity', width: 100 },
  {
    field: 'estimatedCompletionTime',
    headerName: 'Estimated Completion time',
    width: 200,
    valueFormatter: ({ value }: GridValueFormatterParams<Task['estimatedCompletionTime']>) =>
      valueOrDash(value, (v) => formatToDateAndTime(v))
  },
  {
    field: 'order',
    headerName: 'Order',
    width: 100,
    valueFormatter: ({ value }: GridValueFormatterParams<Task['order']>) => valueOrDash(value)
  },
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
    valueFormatter: ({ value }: GridValueFormatterParams<Task['completionDetails']['time']>) =>
      valueOrDash(value, (v) => formatToDateAndTime(v))
  }
  /*
  // will be implemented
  { field: 'payment', headerName: 'payment', width: 100 },
  { field: 'cashOnDeliver', headerName: 'Cash on deliver', width: 100 },
  { field: 'internalOrderNo', headerName: 'Internal order no', width: 100 },
  */
];
