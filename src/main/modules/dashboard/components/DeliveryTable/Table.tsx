import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { OnfleetTask } from '@onfleet/node-onfleet/Resources/Tasks';

import { useUserTasksQuery } from '../../../../queryHooks/useUserTasksQuery';
import { useUser } from '../../../../integrations/firebase/components/UserProvider';
import { useSnackBar } from '../../../../components/snackBar/SnackbarProvider';
import { DELIVERY_COLUMNS } from '../../constants/columns';
import { NoData } from './NoData';

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
        columns={DELIVERY_COLUMNS}
        checkboxSelection
        disableSelectionOnClick
        components={{ NoRowsOverlay: NoData }}
      />
    </Box>
  );
}
