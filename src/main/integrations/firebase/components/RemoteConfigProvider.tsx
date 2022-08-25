import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { fetchAndActivate, getValue } from 'firebase/remote-config';

import { ROLES } from '../constants';
import { remoteConfig } from '..';

type Props = {
  children: ReactNode;
};

type UserRoles = {
  [key: string]: ROLES[];
};

type RemoteConfigProviderType = {
  userRoles: UserRoles | null;
};

export const RemoteConfigContext = createContext<RemoteConfigProviderType | null>(null);

export function RemoteConfigProvider({ children }: Props) {
  const [userRoles, setUserRoles] = useState<UserRoles | null>(null);

  useEffect(() => {
    fetchAndActivate(remoteConfig)
      .then(() => {
        const userRolesValue = getValue(remoteConfig, 'userRoles');
        const parsedValueString = JSON.parse(userRolesValue.asString());
        setUserRoles(parsedValueString);
      })
      .catch(() => {
        // TODO: log error while loading remote config
      });
  }, []);

  const providerValueMemoized = useMemo(() => ({ userRoles }), [userRoles]);

  return (
    // @ts-ignore
    <RemoteConfigContext.Provider value={providerValueMemoized}>
      {children}
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
