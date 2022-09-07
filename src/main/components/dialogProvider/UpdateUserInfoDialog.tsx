import React from 'react';
import MuiDialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export function UpdateUserInfoDialog() {
  const onCloseDialog = () => {};
  const handleSubmit = () => {};

  return (
    <MuiDialog open={false} onClose={onCloseDialog} fullWidth>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <DialogTitle>Change password</DialogTitle>
        <DialogContent>
          <DialogContentText>Update user info</DialogContentText>
          <TextField
            margin="normal"
            fullWidth
            name="displayName"
            label="Display Name"
            type="text"
            id="displayName"
          />
          <TextField
            margin="normal"
            fullWidth
            name="photoURL"
            label="Photo URL"
            type="text"
            id="photoURL"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </DialogActions>
      </Box>
    </MuiDialog>
  );
}
