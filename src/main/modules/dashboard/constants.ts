import { GridColDef } from '@mui/x-data-grid';

export const taskColumns: GridColDef[] = [
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
