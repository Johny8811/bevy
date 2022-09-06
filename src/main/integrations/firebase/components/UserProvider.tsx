import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { isEqual } from 'date-fns';

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
  const handleOpenChangePasswordDialogFirstTime = () => setChangePasswordState({ firstTime: true });
  const handleOpenChangePasswordDialog = () => setChangePasswordState({ firstTime: false });

  useEffect(() => {
    startLoading?.();

    onAuthStateChanged(auth, (signedUser) => {
      setUser(signedUser || null);
      setUserLoaded(true);
      stopLoading?.();

      // FIXME: we access prop that is not accessible by type,
      //  in future we need to improve the flag to know if user has already updated the password
      if (
        isEqual(
          // @ts-ignore
          Number(signedUser?.reloadUserInfo.createdAt),
          // @ts-ignore
          signedUser?.reloadUserInfo.passwordUpdatedAt
        )
      ) {
        handleOpenChangePasswordDialogFirstTime();
      }
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
