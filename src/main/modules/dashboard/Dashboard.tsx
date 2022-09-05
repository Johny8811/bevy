import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';

import { mapSheetToTaskData } from '../../utils/onFleet/mapSheetToTaskData';
import { isDev } from '../../utils/isDev';
import { FileInput, OnChangeParams } from '../../components/fileInput/FileInput';
import { TaskData } from '../../types/tasks';
import { useSignOut } from '../../integrations/firebase/hooks/useSignOut';
import { useUserRoles } from '../../integrations/firebase/hooks/useUserRoles';
import { useUser } from '../../integrations/firebase/components/UserProvider';
import { useHasRole } from '../../integrations/firebase/hooks/useHasRole';
import { useOnFleetExportTasks } from './hooks/useOnFleetExportTasks';
import { Table as DeliveryTable } from './components/DeliveryTable/Table';
import { Dialog as BadImportsDialog } from './components/BadImportsDialog/Dialog';
import { useCreateTasks } from './hooks/useCreateTasks';

export function Dashboard() {
  const navigate = useNavigate();
  const signOut = useSignOut({
    onSuccess: () => navigate('/', { replace: true })
  });
  const { createTasks, createTasksResult } = useCreateTasks();
  const onFleetExportTasks = useOnFleetExportTasks();
  const hasRole = useHasRole();
  const { user, openChangePasswordDialog } = useUser();
  const userRoles = useUserRoles();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChangeFileInput = async ({ file }: OnChangeParams) => {
    if (file) {
      const tasks = await mapSheetToTaskData(file);
      await createTasks(tasks);
    }
  };

  const handleOnImportFixedTasks = (tasks: TaskData[]) => createTasks(tasks);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Name: {user?.displayName || user?.email || '-'}{' '}
            {isDev() && `| Roles: ${userRoles?.join(',')}`}
          </Typography>
          <Stack spacing={2} direction="row">
            {hasRole('user') && (
              <Button variant="contained" onClick={openChangePasswordDialog}>
                Change password
              </Button>
            )}
            <FileInput onChange={handleChangeFileInput}>Import tasks</FileInput>
            {(hasRole('dispatcher') || hasRole('root')) && (
              <Button variant="contained" onClick={onFleetExportTasks}>
                OnFleet - export tasks
              </Button>
            )}
            {(hasRole('user') || hasRole('root')) && (
              <DatePicker
                label="Select date"
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      svg: { color: '#fff' },
                      input: { color: '#fff' },
                      label: { color: '#fff' }
                    }}
                    color="secondary"
                  />
                )}
              />
            )}
            <Button variant="contained" onClick={signOut}>
              Sign out
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <DeliveryTable selectedDay={selectedDate} />
      <BadImportsDialog
        importedCount={createTasksResult?.tasks.length}
        failedTasks={createTasksResult?.errors}
        onImportFixedTasks={handleOnImportFixedTasks}
      />
    </Box>
  );
}
