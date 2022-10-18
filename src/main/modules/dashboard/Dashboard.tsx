import React, { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
import { useDialog } from '../../components/dialogProvider/DialogProvider';
import { useHasRole } from '../../integrations/firebase/hooks/useHasRole';
import { DialogsNames } from '../../components/dialogProvider/types';
import { useOnFleetExportTasks } from './hooks/useOnFleetExportTasks';
import { Table as TasksTable } from './components/tasksTable/Table';
import { Dialog as BadImportsDialog } from './components/badImportsDialog/Dialog';
import { SelectDateRange, DateRange } from './components/SelectDateRange';
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
  const { openDialog } = useDialog();

  const [completeAfter, setCompleteAfter] = useState<DateRange['completeAfter']>(null);
  const [completeBefore, setCompleteBefore] = useState<DateRange['completeBefore']>(null);

  const handleChangeFileInput = useCallback(
    async ({ file }: OnChangeParams) => {
      if (file) {
        const tasks = await mapSheetToTaskData(file, user?.displayName);
        await createTasks(tasks);
      }
    },
    [user?.displayName]
  );

  const handleOnImportFixedTasks = (tasks: TaskData[]) => createTasks(tasks);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Name: {user?.email || '-'}{' '}
            {isDev() && `| Roles: ${userRoles?.join(',')}, Name: ${user?.displayName || '-'}`}
          </Typography>
          <Stack spacing={2} direction="row">
            {hasRole('root') && (
              <Button
                variant="contained"
                onClick={() => openDialog({ name: DialogsNames.UpdateUserInfo })}>
                Update user info
              </Button>
            )}
            {hasRole('user') && (
              <Button variant="contained" onClick={openChangePasswordDialog}>
                Change password
              </Button>
            )}
            {(hasRole('dispatcher') || hasRole('root')) && (
              <Button variant="contained" onClick={onFleetExportTasks}>
                OnFleet - export tasks
              </Button>
            )}
            <FileInput onChange={handleChangeFileInput}>Import tasks</FileInput>
            <SelectDateRange
              completeAfter={completeAfter}
              completeBefore={completeBefore}
              onCompleteAfterChange={setCompleteAfter}
              onCompleteBeforeChange={setCompleteBefore}
            />
            <Button variant="contained" onClick={signOut}>
              Sign out
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <TasksTable completeAfter={completeAfter} completeBefore={completeBefore} />
      <BadImportsDialog
        importedCount={createTasksResult?.tasks.length}
        failedTasks={createTasksResult?.errors}
        onImportFixedTasks={handleOnImportFixedTasks}
      />
    </Box>
  );
}
