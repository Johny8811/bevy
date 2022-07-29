import { signOut } from 'firebase/auth';
import { auth } from '../index';

type Props = {
  onSuccess: () => void;
  onError?: () => void;
};

export const useSignOut = ({ onSuccess, onError }: Props) => {
  return () => {
    signOut(auth)
      .then(() => {
        onSuccess();
      })
      // TODO: improve error handling if it will be necessary
      .catch((/* { code, message } */) => {
        onError?.();
      });
  };
};
