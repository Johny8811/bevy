import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { DataGridDemo } from './components/DeliveryTable';

export function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dispatcher: Emil
          </Typography>
          <Button color="inherit">Export data</Button>
          <Button color="inherit">Load data</Button>
        </Toolbar>
      </AppBar>
      <DataGridDemo />
    </Box>
  );
}
