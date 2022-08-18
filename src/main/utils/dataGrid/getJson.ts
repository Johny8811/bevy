import { MutableRefObject } from 'react';
import {
  GridApi,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector
} from '@mui/x-data-grid';

// TODO: add tests
export const getJson = (apiRef: MutableRefObject<GridApi>) => {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  // Format the data. Here we only keep the value
  return filteredSortedRowIds.map((id) => {
    const row: Record<string, any> = {};
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });
};
