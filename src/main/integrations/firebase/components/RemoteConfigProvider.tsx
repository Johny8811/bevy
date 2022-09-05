import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { fetchAndActivate, getValue } from 'firebase/remote-config';
import { User } from 'firebase/auth';

import { useLoading } from '../../fetch/components/LoadingProvider';
import { ROLES } from '../constants';
import { remoteConfig } from '..';

type Props = {
  children: ReactNode;
};

type UsersRoles = {
  [key: User['uid']]: ROLES[];
};

type RemoteConfigProviderType = {
  usersRoles: UsersRoles | null;
};

export const RemoteConfigContext = createContext<RemoteConfigProviderType | null>(null);

export function RemoteConfigProvider({ children }: Props) {
  const { startLoading, stopLoading } = useLoading();
  const [usersRoles, setUsersRoles] = useState<UsersRoles | null>(null);

  useEffect(() => {
    startLoading?.();

    fetchAndActivate(remoteConfig)
      .then(() => {
        // TODO: log: fetched
        const userRolesValue = getValue(remoteConfig, 'userRoles');
        const parsedValueString = JSON.parse(userRolesValue.asString());
        setUsersRoles(parsedValueString);
        stopLoading?.();
      })
      .catch(() => {
        // TODO: log error
        stopLoading?.();
        setUsersRoles({});
      });
  }, []);

  const providerValueMemoized = useMemo(() => ({ usersRoles }), [usersRoles]);

  return (
    <RemoteConfigContext.Provider value={providerValueMemoized}>
      {usersRoles && children}
    </RemoteConfigContext.Provider>
  );
}

export const useRemoteConfig = () => {
  const remoteConfigContext = useContext(RemoteConfigContext);

  if (!remoteConfigContext) {
    throw new Error('calling useRemoteConfig out of RemoteConfigContext');
  }

  return remoteConfigContext;
};
