import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';

type Props = {
  changePasswordOpened: boolean;
  onCloseDialog: () => void;
};

export function ChangePasswordDialog({ changePasswordOpened, onCloseDialog }: Props) {
  return (
    <Dialog open={changePasswordOpened} onClose={onCloseDialog}>
      <DialogTitle>Change password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You need to update your password because this is the first time you are singing in.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseDialog}>Cancel</Button>
        <Button onClick={() => {}}>Change password</Button>
      </DialogActions>
    </Dialog>
  );
}
