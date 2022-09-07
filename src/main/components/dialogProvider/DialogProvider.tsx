import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { UpdateUserInfoDialog } from './UpdateUserInfoDialog';
import { DialogsNames, DialogsState, DialogState } from './types';

type Props = {
  children: ReactNode;
};

type DialogProviderType = {
  openDialog: (state: DialogState) => void;
};

export const DialogContext = createContext<DialogProviderType | null>(null);

export function DialogProvider({ children }: Props) {
  const [dialogsState, setDialogsState] = useState<DialogsState>([]);

  const handleOpenDialog = (state: DialogState) => setDialogsState((s) => [...s, state]);
  const handleCloseDialog = (name: DialogsNames) =>
    setDialogsState((s) => s.filter((v) => v.name !== name));

  const providerValueMemoized = useMemo(() => ({ openDialog: handleOpenDialog }), []);

  const updateUserInfoData = useMemo(
    () => dialogsState.find((s) => s.name === DialogsNames.UpdateUserInfo),
    [dialogsState]
  );

  return (
    <DialogContext.Provider value={providerValueMemoized}>
      {children}
      <UpdateUserInfoDialog open={!!updateUserInfoData} onCloseDialog={handleCloseDialog} />
    </DialogContext.Provider>
  );
}

export const useDialog = () => {
  const dialogContext = useContext(DialogContext);

  if (!dialogContext) {
    throw new Error('calling useDialog out of DialogContext');
  }

  return dialogContext;
};
