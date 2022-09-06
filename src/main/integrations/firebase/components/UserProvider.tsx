import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';

import { useLoading } from '../../fetch/components/LoadingProvider';
import { auth } from '..';
import { ChangePasswordDialog } from './ChangePasswordDialog';

export type ChangePasswordState = {
  firstTime: boolean;
};

type Props = {
  children: ReactNode;
};

type UserProviderType = {
  user: User | null;
  openChangePasswordDialog: () => void;
};

export const UserContext = createContext<UserProviderType | null>(null);

export function UserProvider({ children }: Props) {
  const { startLoading, stopLoading } = useLoading();

  const [user, setUser] = useState<User | null>(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [changePasswordState, setChangePasswordState] = useState<ChangePasswordState | null>(null);

  const handleCloseChangePasswordDialog = () => setChangePasswordState(null);
  const handleOpenChangePasswordDialog = () => setChangePasswordState({ firstTime: false });

  useEffect(() => {
    startLoading?.();

    onAuthStateChanged(auth, (signedUser) => {
      setUser(signedUser || null);
      setUserLoaded(true);
      stopLoading?.();
    });
  }, []);

  const providerValueMemoized = useMemo(
    () => ({
      user,
      openChangePasswordDialog: handleOpenChangePasswordDialog
    }),
    [user]
  );

  return (
    <UserContext.Provider value={providerValueMemoized}>
      {userLoaded && children}
      <ChangePasswordDialog
        changePasswordState={changePasswordState}
        onCloseDialog={handleCloseChangePasswordDialog}
      />
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('calling useUser out of UserContext');
  }

  return userContext;
};
