import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { OnfleetTask } from '@onfleet/node-onfleet/Resources/Tasks';

import { useUserTasksQuery } from '../../../../queryHooks/useUserTasksQuery';
import { useUser } from '../../../../integrations/firebase/components/UserProvider';
import { useSnackBar } from '../../../../components/snackBar/SnackbarProvider';
import { NoData } from './NoData';

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

type Props = {
  selectedDay: Date | null;
};

export function Table({ selectedDay }: Props) {
  const { user } = useUser();
  const userTasksQuery = useUserTasksQuery();
  const { openSnackBar } = useSnackBar();
  const [userTasks, setUserTasks] = useState<OnfleetTask[] | []>([]);

  useEffect(() => {
    if (user?.uid && selectedDay) {
      userTasksQuery(user?.uid, selectedDay)
        .then((tasks) => setUserTasks(tasks))
        .catch(() => {
          openSnackBar({
            text: 'Someting went wrong while getting data',
            severity: 'error'
          });
        });
    }
  }, [selectedDay]);

  return (
    <Box sx={{ height: 'calc(100vh - 68px)', width: '100%' }}>
      <DataGrid
        rows={userTasks}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        components={{ NoRowsOverlay: NoData }}
      />
    </Box>
  );
}
