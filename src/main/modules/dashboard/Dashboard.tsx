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

import { transformSheetToTaskData } from '../../utils/onFleet/transformSheeToTaskData';
import { isDev } from '../../utils/isDev';
import { FileInput, OnChangeParams } from '../../components/fileInput/FileInput';
import { TaskData } from '../../types/tasks';
import { useSignOut } from '../../integrations/firebase/hooks/useSignOut';
import { DeliveryTable } from './components/DeliveryTable';
import { Dialog as BadImportsDialog } from './components/BadImportsDialog/Dialog';
import { useCreateTasks } from './hooks/useCreateTasks';

export function Dashboard() {
  const navigate = useNavigate();
  const signOut = useSignOut({
    onSuccess: () => navigate('/', { replace: true })
  });
  const { createTasks, result } = useCreateTasks();
  const [value, setValue] = useState<Date | null>(null);

  const handleChangeFileInput = async ({ file }: OnChangeParams) => {
    if (file) {
      const tasks = await transformSheetToTaskData(file);
      await createTasks(tasks);
    }
  };

  const handleOnImportFixedTasks = (tasks: TaskData[]) => createTasks(tasks);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Name: -
          </Typography>
          <Stack spacing={2} direction="row">
            {isDev() && (
              <Button color="inherit" onClick={() => {}}>
                Export data
              </Button>
            )}
            <FileInput title="Upload data" onChange={handleChangeFileInput} />
            <DatePicker
              label="Select date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
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
            <Button variant="contained" onClick={signOut}>
              Sign out
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      {isDev() ? (
        <DeliveryTable />
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 4
          }}>
          No data
        </Box>
      )}
      <BadImportsDialog
        importedCount={result?.importedCount}
        failedTasks={result?.failedTasks}
        onImportFixedTasks={handleOnImportFixedTasks}
      />
    </Box>
  );
}
