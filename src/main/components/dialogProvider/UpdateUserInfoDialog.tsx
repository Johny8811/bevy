import React, { useCallback, useState } from 'react';
import MuiDialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { useUpdateUserInfoQuery } from '../../queryHooks/useUpdateUserInfoQuery';
import { useSnackBar } from '../snackBar/SnackbarProvider';
import { DialogsNames } from './types';

type Props = {
  open: boolean;
  onCloseDialog: (name: DialogsNames) => void;
};

export function UpdateUserInfoDialog({ open, onCloseDialog }: Props) {
  const { openSnackBar } = useSnackBar();
  const [uidError, setUidError] = useState(false);
  const updateUserInfoQuery = useUpdateUserInfoQuery();

  const handleCloseDialog = useCallback(() => onCloseDialog(DialogsNames.UpdateUserInfo), []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const uid = data.get('uid') as string;
    const displayName = data.get('displayName') as string;
    const photoURL = data.get('photoURL') as string;

    if (!uid) {
      setUidError(true);
      return;
    }

    if (displayName || photoURL) {
      await updateUserInfoQuery({ userId: uid, displayName, photoURL });

      handleCloseDialog();
      openSnackBar({
        severity: 'success',
        text: 'User data successfully updated'
      });
    } else {
      openSnackBar({
        severity: 'warning',
        text: 'There is nothing to save'
      });
    }
  };

  return (
    <MuiDialog open={open} onClose={handleCloseDialog} fullWidth>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <DialogTitle>Change password</DialogTitle>
        <DialogContent>
          <DialogContentText>Update user info</DialogContentText>
          <TextField
            margin="normal"
            fullWidth
            name="uid"
            label="User ID"
            type="text"
            id="uid"
            error={uidError}
            helperText={uidError && 'User ID is required'}
            onChange={() => setUidError((v) => v && !v)}
          />
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
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </DialogActions>
      </Box>
    </MuiDialog>
  );
}
