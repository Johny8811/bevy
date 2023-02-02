import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarContainerProps } from '@mui/x-data-grid';

import { TASKS_TABLE_COLUMNS } from '../../constants/columns';
import { useTasksData } from '../../hooks/useTasksData';
import { DateRange } from '../SelectDateRange';
import { NoData } from './NoData';
import { CustomGridToolbarExport } from './CustomGridToolbarExport';

function CustomToolbar({
  gridContainerProps,
  dateRange
}: {
  gridContainerProps: GridToolbarContainerProps;
  dateRange: DateRange;
}) {
  return (
    <GridToolbarContainer {...gridContainerProps}>
      <CustomGridToolbarExport dateRange={dateRange} />
    </GridToolbarContainer>
  );
}

type Props = DateRange;

export function Table(props: Props) {
  const { completeAfter, completeBefore } = props;
  const tasksData = useTasksData(props);

  return (
    <Box sx={{ height: 'calc(100vh - 68px)', width: '100%' }}>
      <DataGrid
        rows={tasksData}
        columns={TASKS_TABLE_COLUMNS}
        checkboxSelection
        disableSelectionOnClick
        components={{ Toolbar: CustomToolbar, NoRowsOverlay: NoData }}
        componentsProps={{
          toolbar: {
            dateRange: { completeAfter, completeBefore }
          }
        }}
      />
    </Box>
  );
}
