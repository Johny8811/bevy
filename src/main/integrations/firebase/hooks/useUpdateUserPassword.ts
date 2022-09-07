import { updatePassword } from 'firebase/auth';

import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';
import { auth } from '..';

export const useUpdateUserPassword = () => {
  const { openSnackBar } = useSnackBar();

  return async (newPassword: Parameters<typeof updatePassword>[1]) => {
    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);

        openSnackBar({
          text: 'Password updated.',
          severity: 'success'
        });
      }
    } catch (e) {
      // TODO: log error
      openSnackBar({
        text: 'Update user password failed.',
        severity: 'error'
      });
    }
  };
};
