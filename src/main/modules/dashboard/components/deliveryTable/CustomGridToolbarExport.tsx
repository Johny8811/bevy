import React from 'react';
import { ButtonProps } from '@mui/material/Button';
import {
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  GridPrintExportMenuItem
} from '@mui/x-data-grid';

export function CustomGridToolbarExport(props: ButtonProps) {
  return (
    <GridToolbarExportContainer {...props}>
      <GridCsvExportMenuItem />
      <GridPrintExportMenuItem />
    </GridToolbarExportContainer>
  );
}
