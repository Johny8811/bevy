import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';

import { auth } from '..';

type Props = {
  children: ReactNode;
};

type UserProviderType = {
  user: User | null;
};

export const UserContext = createContext<UserProviderType | null>(null);

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (signedUser) => {
      setUser(signedUser || null);
    });
  }, []);

  const providerValueMemoized = useMemo(() => ({ user }), [user]);

  return <UserContext.Provider value={providerValueMemoized}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('calling useUser out of UserContext');
  }

  return userContext;
};