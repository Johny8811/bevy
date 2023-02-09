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
import { useAggregatedTasksQuery } from '../../../../queryHooks/useAggregatedTasksQuery';
import { useHasRole } from '../../../../integrations/firebase/hooks/useHasRole';

import { DateRange } from '../SelectDateRange';

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

function AggregatedAddressExportMenuItem(dateRange: DateRange) {
  const getAggregatedTasks = useAggregatedTasksQuery(dateRange);

  return (
    <MenuItem
      onClick={() => {
        getAggregatedTasks()
          .then((data) => {
            const formattedData = data
              .filter((v) => v.uniqAddress)
              .sort((a, b) => {
                return a.uniqAddress.length - b.uniqAddress.length;
              })
              .map((d) => [
                {
                  name: undefined,
                  phoneNumber: undefined,
                  // eslint-disable-next-line no-underscore-dangle
                  street: d._id.street,
                  // eslint-disable-next-line no-underscore-dangle
                  number: d._id.number,
                  // eslint-disable-next-line no-underscore-dangle
                  city: d._id.city,
                  // eslint-disable-next-line no-underscore-dangle
                  completeAfter: d._id.completeAfter
                    ? // eslint-disable-next-line no-underscore-dangle
                      formatToDateAndTime(d._id.completeAfter)
                    : undefined,
                  completeBefore: undefined,
                  country: undefined,
                  postalCode: undefined,
                  shortId: undefined,
                  deliveredAt: undefined,
                  estimatedArrivalTime: undefined,
                  order: undefined,
                  quantity: undefined,
                  recipientNotes: undefined,
                  slot: undefined,
                  workerName: undefined,
                  workerPhone: undefined
                },
                d.uniqAddress.map((a) => ({
                  name: a.recipients[0]?.name,
                  phoneNumber: a.recipients[0]?.phone,
                  street: a.destination.address.street,
                  number: a.destination.address.number,
                  city: a.destination.address.city,
                  completeAfter: a.completeAfter ? formatToDateAndTime(a.completeAfter) : undefined,
                  completeBefore: a.completeBefore
                    ? formatToDateAndTime(a.completeBefore)
                    : undefined,
                  country: a.destination.address.country,
                  postalCode: a.destination.address.postalCode,
                  shortId: a.shortId,
                  deliveredAt: a.completionDetails.time
                    ? formatToDateAndTime(a.completionDetails.time)
                    : undefined,
                  estimatedArrivalTime: a.estimatedArrivalTime
                    ? formatToDateAndTime(a.estimatedArrivalTime)
                    : undefined,
                  order: a.order,
                  quantity: a.quantity,
                  recipientNotes: a.recipients[0]?.notes,
                  slot: a.slot,
                  workerName: undefined,
                  workerPhone: undefined
                }))
              ])
              .flat(2);

            const worksheet = utils.json_to_sheet(formattedData);
            const workbook = {
              Sheets: { Tasks: worksheet },
              SheetNames: ['Tasks']
            };

            writeFileXLSX(workbook, 'BEVY_NP_aggregated.xlsx');
          })
          .catch((e) => {
            console.error('==> Error: ', e);
          });
      }}>
      Download aggregated tasks
    </MenuItem>
  );
}

export function CustomGridToolbarExport({
  buttonProps,
  dateRange
}: {
  dateRange: DateRange;
  buttonProps?: ButtonProps;
}) {
  const hasRole = useHasRole();

  return (
    <GridToolbarExportContainer {...buttonProps}>
      <GridCsvExportMenuItem />
      <ExcelExportMenuItem />
      <GridPrintExportMenuItem />
      {hasRole('root') && <AggregatedAddressExportMenuItem {...dateRange} />}
    </GridToolbarExportContainer>
  );
}
