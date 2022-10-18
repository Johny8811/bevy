import React from 'react';
import { ButtonProps } from '@mui/material/Button';
import {
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  GridPrintExportMenuItem,
  GridExportMenuItemProps,
  useGridApiContext
} from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import { writeFileXLSX, utils } from 'xlsx';

import { formatToDateAndTime } from '../../../../utils/formatDates';
import { getGridData } from '../../../../utils/dataGrid/getGridData';

function ExcelExportMenuItem(props: GridExportMenuItemProps<{}>) {
  const apiRef = useGridApiContext();

  const { hideMenu } = props;

  return (
    <MenuItem
      onClick={() => {
        // TODO: investigate and improve data processing
        const jsonData = getGridData(apiRef).map((task) => ({
          ...task,
          completeAfter: task.completeAfter && formatToDateAndTime(task.completeAfter),
          completeBefore: task.completeBefore && formatToDateAndTime(task.completeBefore),
          estimatedArrivalTime:
            task.estimatedArrivalTime && formatToDateAndTime(task.estimatedArrivalTime),
          deliveredAt: task.deliveredAt && formatToDateAndTime(task.deliveredAt)
        }));

        const worksheet = utils.json_to_sheet(jsonData);
        const workbook = {
          Sheets: { Tasks: worksheet },
          SheetNames: ['Tasks']
        };

        writeFileXLSX(workbook, 'BEVY.xlsx');
        hideMenu?.();
      }}>
      Download as EXCEL
    </MenuItem>
  );
}

export function CustomGridToolbarExport(props: ButtonProps) {
  return (
    <GridToolbarExportContainer {...props}>
      <GridCsvExportMenuItem />
      <ExcelExportMenuItem />
      <GridPrintExportMenuItem />
    </GridToolbarExportContainer>
  );
}
