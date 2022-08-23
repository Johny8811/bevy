import React, { createContext, ReactNode, useMemo, useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

type SnackBarState = {
  text: string;
  severity: AlertColor;
};

type SnackBarProviderType = {
  openSnackBar: (state: SnackBarState) => void;
};

const SnackBarContext = createContext<SnackBarProviderType | null>(null);

type Props = {
  children: ReactNode;
};

const AUTO_HIDE_DURATION = 10000;

export function SnackBarProvider({ children }: Props) {
  const [snackBarState, setSnackBarState] = useState<SnackBarState | null>(null);

  const handleOpenSnackBar = (state: SnackBarState) => {
    setSnackBarState(state);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarState(null);
  };

  const value = useMemo(() => ({ openSnackBar: handleOpenSnackBar }), []);

  return (
    <SnackBarContext.Provider value={value}>
      {children}
      <Snackbar
        open={!!snackBarState}
        autoHideDuration={AUTO_HIDE_DURATION}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert onClose={handleClose} severity={snackBarState?.severity} sx={{ width: '100%' }}>
          {snackBarState?.text}
        </MuiAlert>
      </Snackbar>
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
