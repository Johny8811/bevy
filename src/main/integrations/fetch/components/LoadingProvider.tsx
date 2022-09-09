// TODO: replace with better loading management (react-query should have loading build-in)
import React, { createContext, ReactNode, useMemo, useState, useContext } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import { isDev } from '../../../utils/isDev';

type LoadingProviderType = {
  startLoading?: () => void;
  stopLoading?: () => void;
};

const LoadingContext = createContext<LoadingProviderType>({});

type Props = {
  children: ReactNode;
};

const IS_DEV = isDev();

export function LoadingProvider({ children }: Props) {
  const [loading, setLoading] = useState(0);

  const handleStartLoading = () => setLoading((state) => state + 1);
  const handleStopLoading = () => setLoading((state) => (state > 0 ? state - 1 : 0));

  const value = useMemo(
    () => ({
      startLoading: handleStartLoading,
      stopLoading: handleStopLoading
    }),
    []
  );

  return (
    <LoadingContext.Provider value={value}>
      {loading > 0 ? (
        <LinearProgress color={IS_DEV ? 'secondary' : 'primary'} />
      ) : (
        <Box sx={{ height: 4, backgroundColor: `${IS_DEV ? 'secondary.main' : 'primary.main'}` }} />
      )}
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => {
  const loadingContext = useContext(LoadingContext);

  if (!loadingContext) {
    throw new Error('calling useLoading out of LoadingContext');
  }

  return loadingContext;
};
