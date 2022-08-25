import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { fetchAndActivate, getValue } from 'firebase/remote-config';

import { useLoading } from '../../fetch/components/LoadingProvider';
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
  const { startLoading, stopLoading } = useLoading();
  const [userRoles, setUserRoles] = useState<UserRoles | null>(null);

  useEffect(() => {
    startLoading?.();

    fetchAndActivate(remoteConfig)
      .then(() => {
        const userRolesValue = getValue(remoteConfig, 'userRoles');
        const parsedValueString = JSON.parse(userRolesValue.asString());
        setUserRoles(parsedValueString);
        stopLoading?.();
      })
      .catch(() => {
        stopLoading?.();
        // TODO: log error while loading remote config
      });
  }, []);

  const providerValueMemoized = useMemo(() => ({ userRoles }), [userRoles]);

  return (
    <RemoteConfigContext.Provider value={providerValueMemoized}>
      {userRoles && children}
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
