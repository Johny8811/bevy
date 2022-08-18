import React, { createContext, ReactNode, useMemo, useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

type SnackBarState = {
  text: string;
  severity: AlertColor;
};

type SnackBarProviderType = {
  openSnackBar: (props: SnackBarState) => void;
};

const SnackBarContext = createContext<SnackBarProviderType | null>(null);

type Props = {
  children: ReactNode;
};

const AUTO_HIDE_DURATION = 6000;

export function SnackBarProvider({ children }: Props) {
  const [snackBarProps, setSnackBarProps] = useState<SnackBarState | null>(null);

  const handleOpenSnackBar = (props: SnackBarState) => {
    setSnackBarProps(props);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarProps(null);
  };

  const value = useMemo(() => ({ openSnackBar: handleOpenSnackBar }), []);

  return (
    <SnackBarContext.Provider value={value}>
      {children}
      <Snackbar open={!!snackBarProps} autoHideDuration={AUTO_HIDE_DURATION} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={snackBarProps?.severity} sx={{ width: '100%' }}>
          {snackBarProps?.text}
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
