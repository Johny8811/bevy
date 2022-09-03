import { read, utils } from 'xlsx';
import { TaskData, RawSheetData, SheetColumns } from '../../types/tasks';

import { excelDateToJSDate } from '../excelDateToJSDate';

export const mapSheetToTaskData = async (tasksXlsx: File): Promise<TaskData[]> => {
  const buff = await tasksXlsx.arrayBuffer();
  const workbook = read(buff);

  const sheetNameList = workbook.SheetNames;
  const parsedSheetData = utils.sheet_to_json<RawSheetData>(workbook.Sheets[sheetNameList[0]]);

  return parsedSheetData.map((data) => {
    // Recipients
    const quantity = data[SheetColumns.QUANTITY] || 1;
    const name = `${data[SheetColumns.CUSTOMER_NAME]} ${quantity}ks`;
    const phoneNumber = data[SheetColumns.TEL_NUMBER]?.toString() || '';
    const recipientNotes = data[SheetColumns.CUSTOMER_NOTE];
    const skipSMSNotifications = data[SheetColumns.NOTIFICATION];

    // Destination
    const houseNumber = data[SheetColumns.HOUSE_NUMBER]?.toString() || '';
    const street = data[SheetColumns.STREET] || '';
    const city = data[SheetColumns.CITY] || '';
    const postalCode = data[SheetColumns.POSTAL_CODE]?.toString();
    const country = data[SheetColumns.COUNTRY] || '';

    // Delivery time
    const completeAfter =
      typeof data[SheetColumns.DELIVER_AFTER] === 'number'
        ? excelDateToJSDate(data[SheetColumns.DELIVER_AFTER] as number).getTime()
        : undefined;
    const completeBefore =
      typeof data[SheetColumns.DELIVER_BEFORE] === 'number'
        ? excelDateToJSDate(data[SheetColumns.DELIVER_BEFORE] as number).getTime()
        : undefined;

    return {
      name,
      phoneNumber,
      recipientNotes,
      skipSMSNotifications,
      houseNumber,
      street,
      city,
      postalCode,
      country,
      completeAfter,
      completeBefore,
      quantity
    };
  });
};
