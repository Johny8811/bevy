import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../index';

type Props = {
  onSuccess: () => void;
  onError: () => void;
};

export const useSignIn = ({ onSuccess, onError }: Props) => {
  return (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        onSuccess();
      })
      // TODO: improve error handling if it will be necessary
      .catch((/* { code, message } */) => {
        onError();
      });
  };
};
