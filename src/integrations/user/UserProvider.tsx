import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase';

type Props = {
  children: ReactNode;
};

export const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (signedUser) => {
      if (signedUser) {
        // set signed user
        setUser(signedUser);
      } else {
        // TODO: add logger
        console.log('No user is signed');
      }
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
