import React from 'react';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

export function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
