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

const MIN_PASSWORD_LENGTH = 8;

export function Dialog({ changePasswordState, onCloseDialog }: Props) {
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newPassword = data.get('newPassword') as string;
    const confirmPassword = data.get('confirmPassword') as string;

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setPasswordTooShort(true);
      return;
    }
    setPasswordTooShort(false);

    if (newPassword !== confirmPassword) {
      setPasswordsDontMatch(true);
      return;
    }
    setPasswordsDontMatch(false);

    // TODO: update password
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
            error={passwordTooShort}
            helperText={passwordTooShort && 'Please enter at least 8 characters'}
            onChange={(event) => {
              if (event.target.value.length > MIN_PASSWORD_LENGTH) {
                setPasswordTooShort(false);
              }
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            autoComplete="current-password"
            error={passwordsDontMatch}
            helperText={passwordsDontMatch && "Password don't match"}
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
