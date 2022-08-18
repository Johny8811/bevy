import React, { createContext, ReactNode, useMemo, useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';

type SnackBarProviderType = {
  openSnackBar: (text: string) => void;
};

const SnackBarContext = createContext<SnackBarProviderType | null>(null);

type Props = {
  children: ReactNode;
};

const AUTO_HIDE_DURATION = 6000;

export function SnackBarProvider({ children }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpenSnackBar = () => setOpen(true);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const value = useMemo(() => ({ openSnackBar: handleOpenSnackBar }), []);

  return (
    <SnackBarContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={AUTO_HIDE_DURATION}
        onClose={handleClose}
        message="Note archived"
      />
    </SnackBarContext.Provider>
  );
}

export const useSnackBar = () => {
  const snackBarContext = useContext(SnackBarContext);

  if (!snackBarContext) {
    throw new Error('calling useLoading out of SnackBarContext');
  }

  return snackBarContext;
};
