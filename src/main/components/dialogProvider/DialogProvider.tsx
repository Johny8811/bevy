import React, { createContext, ReactNode, useContext, useMemo } from 'react';

import { UpdateUserInfoDialog } from './UpdateUserInfoDialog';

type Props = {
  children: ReactNode;
};

type DialogProviderType = {};

export const DialogContext = createContext<DialogProviderType | null>(null);

export function UserProvider({ children }: Props) {
  const providerValueMemoized = useMemo(() => ({}), []);

  return (
    <DialogContext.Provider value={providerValueMemoized}>
      {children}
      <UpdateUserInfoDialog />
    </DialogContext.Provider>
  );
}

export const useDialog = () => {
  const dialogContext = useContext(DialogContext);

  if (!dialogContext) {
    throw new Error('calling useUser out of DialogContext');
  }

  return dialogContext;
};