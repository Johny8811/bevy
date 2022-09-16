import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

import { useHasRole } from '../../../integrations/firebase/hooks/useHasRole';

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
};

export function SelectDateRange({ startDate, endDate, onStartDateChange, onEndDateChange }: Props) {
  const hasRole = useHasRole();

  return (
    <>
      {(hasRole('user') || hasRole('root')) && (
        <DatePicker
          label={hasRole('root') ? 'Start date' : 'Select date'}
          value={startDate}
          onChange={onStartDateChange}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                svg: { color: '#fff' },
                input: { color: '#fff' },
                label: { color: '#fff' }
              }}
              color="secondary"
            />
          )}
        />
      )}
      {hasRole('root') && (
        <DatePicker
          label="Select date"
          value={endDate}
          onChange={onEndDateChange}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                svg: { color: '#fff' },
                input: { color: '#fff' },
                label: { color: '#fff' }
              }}
              color="secondary"
            />
          )}
        />
      )}
    </>
  );
}
