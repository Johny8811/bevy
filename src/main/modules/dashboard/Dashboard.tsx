import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import { FileInput, OnChangeParams } from '../../components/fileInput/FileInput';

import { transformSheetToOnFleet } from '../../utils/transformSheeToOnFleet';
import { DeliveryTable } from './components/DeliveryTable';
import { useSignOut } from '../../integrations/firebase/hooks/useSignOut';
import { onFleetCreateTasks } from '../../queries/onFleetCreateTasks';

export function Dashboard() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState<Date | null>(null);

  const signOut = useSignOut({
    onSuccess: () => navigate('/', { replace: true })
  });

  const handleChangeFileInput = async ({ file }: OnChangeParams) => {
    if (file) {
      const onFleetTasks = await transformSheetToOnFleet(file);
      const response = await onFleetCreateTasks(onFleetTasks);

      // TODO: process onFleet response
      console.log('==> dashboard:response ', response);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dispatcher: Emil
          </Typography>
          <Stack spacing={2} direction="row">
            <Button color="inherit" onClick={() => {}}>
              Export data
            </Button>
            <FileInput title="Load data" onChange={handleChangeFileInput} />
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
      <DeliveryTable />
    </Box>
  );
}
