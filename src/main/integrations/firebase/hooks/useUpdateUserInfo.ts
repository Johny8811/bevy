import { updateProfile } from 'firebase/auth';

import { useSnackBar } from '../../../components/snackBar/SnackbarProvider';
import { auth } from '..';

export const useUpdateUserInfo = () => {
  const { openSnackBar } = useSnackBar();
  return async ({ displayName, photoURL }: Parameters<typeof updateProfile>[1]) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName,
          photoURL
        });
      }
    } catch (e) {
      // TODO: log error
      openSnackBar({
        text: 'Update user data failed.',
        severity: 'error'
      });
    }
  };
};
