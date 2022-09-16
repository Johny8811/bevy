import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { DELIVERY_COLUMNS } from '../../constants/columns';
import { useDeliveryTableData } from '../../hooks/useDeliveryTableData';
import { CustomToolbar } from './Toolbar';
import { NoData } from './NoData';
import { DateRange } from '../SelectDateRange';

type Props = DateRange;

export function Table(props: Props) {
  const deliveryTableData = useDeliveryTableData(props);

  return (
    <Box sx={{ height: 'calc(100vh - 68px)', width: '100%' }}>
      <DataGrid
        rows={deliveryTableData}
        columns={DELIVERY_COLUMNS}
        checkboxSelection
        disableSelectionOnClick
        components={{ Toolbar: CustomToolbar, NoRowsOverlay: NoData }}
      />
    </Box>
  );
}
