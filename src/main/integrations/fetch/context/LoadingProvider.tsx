// TODO: replace with better loading management
import React, { createContext, ReactNode, useMemo, useState, useContext } from 'react';

type LoadingProviderType = {
  loading: boolean;
  startLoading?: () => void;
  stopLoading?: () => void;
};

const LoadingContext = createContext<LoadingProviderType>({
  loading: false
});

type Props = {
  children: ReactNode;
};

export function LoadingProvider({ children }: Props) {
  const [loading, setLoading] = useState(false);

  const handleStartLoading = () => setLoading(true);
  const handleStopLoading = () => setLoading(false);

  const value = useMemo(
    () => ({
      loading,
      startLoading: handleStartLoading,
      stopLoading: handleStopLoading
    }),
    [loading]
  );

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}

export const useLoading = () => {
  const loadingContext = useContext(LoadingContext);

  if (!loadingContext) {
    throw new Error('calling useLoading out of LoadingContext');
  }

  return loadingContext;
};
