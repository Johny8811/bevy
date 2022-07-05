import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

import { DeliveryTable } from './components/DeliveryTable';

export function Dashboard() {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dispatcher: Emil
          </Typography>
          <Button color="inherit">Export data</Button>
          <Button color="inherit">Load data</Button>
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
        </Toolbar>
      </AppBar>
      <DeliveryTable />
    </Box>
  );
}
