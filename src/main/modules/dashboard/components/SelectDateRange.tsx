import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

import { useHasRole } from '../../../integrations/firebase/hooks/useHasRole';

export type DateRange = {
  completeAfter: Date | null;
  completeBefore: Date | null;
};

type Props = {
  onCompleteAfterChange: (date: Date | null) => void;
  onCompleteBeforeChange: (date: Date | null) => void;
} & DateRange;

// TODO: move to common components for better reusable
export function SelectDateRange({
  completeAfter,
  completeBefore,
  onCompleteAfterChange,
  onCompleteBeforeChange
}: Props) {
  const hasRole = useHasRole();

  return (
    <>
      {(hasRole('user') || hasRole('root')) && (
        <DatePicker
          label={hasRole('root') ? 'Start date' : 'Select date'}
          value={completeAfter}
          onChange={onCompleteAfterChange}
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
          value={completeBefore}
          onChange={onCompleteBeforeChange}
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
