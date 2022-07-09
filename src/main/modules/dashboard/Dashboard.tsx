import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import { DeliveryTable } from './components/DeliveryTable';
import { useSignOut } from '../../../integrations/firebase/hooks/useSignOut';

export function Dashboard() {
  const navigate = useNavigate();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState<Date | null>(null);

  const signOut = useSignOut({
    onSuccess: () => navigate('/', { replace: true })
  });

  // TODO: create common component for input file
  const handleCahngeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('==> uploaded files: ', event.currentTarget.files);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dispatcher: Emil
          </Typography>
          <Stack spacing={2} direction="row">
            <Button color="inherit">Export data</Button>
            <>
              <Button color="inherit" onClick={() => fileInputRef.current?.click()}>
                Load data
              </Button>
              <input
                type="file"
                name="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleCahngeFileInput}
              />
            </>
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
