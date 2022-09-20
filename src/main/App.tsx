import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';

import { SnackBarProvider } from './components/snackBar/SnackbarProvider';
import { LoadingProvider } from './integrations/fetch/components/LoadingProvider';
import { RemoteConfigProvider } from './integrations/firebase/components/RemoteConfigProvider';
import { UserProvider } from './integrations/firebase/components/UserProvider';
import { DialogProvider } from './components/dialogProvider/DialogProvider';
import Routing from './routing/Routing';

export function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#318260'
          },
          secondary: {
            main: '#b72548'
          },
          error: {
            main: red.A400
          },
          mode: prefersDarkMode ? 'dark' : 'light'
        }
      }),
    [prefersDarkMode]
  );

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SnackBarProvider>
            <LoadingProvider>
              <RemoteConfigProvider>
                <UserProvider>
                  <DialogProvider>
                    <Routing />
                  </DialogProvider>
                </UserProvider>
              </RemoteConfigProvider>
            </LoadingProvider>
          </SnackBarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
