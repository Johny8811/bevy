import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// TypeScript 4.x and above
import type {} from '@mui/x-date-pickers/themeAugmentation';

import { LoadingProvider } from './main/integrations/fetch/context/LoadingProvider';
import Routing from './main/routing/Routing';
import { UserProvider } from './main/integrations/firebase/context/UserProvider';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
  palette: {
    primary: {
      main: '#318260'
    },
    secondary: {
      main: '#b72548'
    },
    error: {
      main: red.A400
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <UserProvider>
          <LoadingProvider>
            <Routing />
          </LoadingProvider>
        </UserProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
