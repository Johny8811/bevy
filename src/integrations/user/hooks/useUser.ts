import { useContext } from 'react';

import { UserContext } from '../UserProvider';

export const useUser = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('calling useAuth out of AuthContext');
  }

  return userContext;
};
