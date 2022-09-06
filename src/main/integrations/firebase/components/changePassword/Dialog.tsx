import React, { useState } from 'react';
import Button from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import { ChangePasswordState } from '../UserProvider';

type Props = {
  changePasswordState: ChangePasswordState | null;
  onCloseDialog: () => void;
};

export function Dialog({ changePasswordState, onCloseDialog }: Props) {
  const [newPasswordError /* , setNewPasswordError */] = useState(false);
  const [newPasswordAgainError /* , setNewPasswordAgainError */] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <MuiDialog open={!!changePasswordState} onClose={onCloseDialog} fullWidth>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <DialogTitle>Change password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {changePasswordState?.firstTime
              ? 'You need to update your password because this is the first time you are singing in.'
              : ''}
          </DialogContentText>
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            id="newPassword"
            autoComplete="current-password"
            error={newPasswordError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPasswordAgain"
            label="New Password Again"
            type={showPassword ? 'text' : 'password'}
            id="newPasswordAgain"
            autoComplete="current-password"
            error={newPasswordAgainError}
            // helperText={'ble' || undefined}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPassword((v) => !v)}>Show password</Button>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Button variant="contained" type="submit">
            Change password
          </Button>
        </DialogActions>
      </Box>
    </MuiDialog>
  );
}
