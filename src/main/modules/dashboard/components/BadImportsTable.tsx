import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { isDev } from '../../../utils/isDev';
import { CreateBatchTasksErrors } from '../../../types/tasks';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: ({ row }: GridValueGetterParams) => `${row.firstName || ''} ${row.lastName || ''}`
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Prd', firstName: 'Harvey', age: 65 }
];

type Props = {
  importedCount?: number;
  errors?: CreateBatchTasksErrors[];
};

export function BadImportsTable({ importedCount = 0, errors }: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (errors && errors.length > 0) {
      setOpen(true);
    }
  }, [errors]);

  return (
    <div>
      {isDev() && (
        <Button variant="contained" onClick={handleClickOpen()}>
          Open bad imports dialog
        </Button>
      )}
      <Dialog
        open={open}
        scroll="paper"
        fullWidth
        maxWidth="lg"
        aria-labelledby="scroll-dialog-title">
        <DialogTitle id="scroll-dialog-title">
          <>
            We couldn&apos;t import some tasks ({errors?.length}), please fix it. Successfully
            imported: {importedCount}
          </>
        </DialogTitle>
        <DialogContent>
          <DataGrid
            rows={rows}
            columns={columns}
            // checkboxSelection
            disableSelectionOnClick
            autoHeight
            hideFooter
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>
            Import fixed tasks
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
