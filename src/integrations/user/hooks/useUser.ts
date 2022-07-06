import { useContext } from 'react';

import { UserContext } from '../UserProvider';

export const useUser = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('calling useUser out of UserContext');
  }

  return userContext;
};
