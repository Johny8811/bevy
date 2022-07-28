import { read, utils } from 'xlsx';
import { parseStreet } from '../parseStreet';
import { RawSheetData, SheetColumns } from '../../types/tasksSheet';

import { excelDateToJSDate } from '../excelDateToJSDate';

export const transformSheetToOnFleet = async (tasksXlsx: File) => {
  const buff = await tasksXlsx.arrayBuffer();
  const workbook = read(buff);

  const sheetNameList = workbook.SheetNames;
  const parsedSheetData = utils.sheet_to_json<RawSheetData>(workbook.Sheets[sheetNameList[0]]);

  return parsedSheetData.map((data) => {
    const { street, streetNo } = parseStreet(data[SheetColumns.ADDRESS_STREET]);
    const name = `${data[SheetColumns.CUSTOMER_NAME]} ${data[SheetColumns.QUANTITY]}`;

    return {
      destination: {
        address: {
          number: streetNo,
          street,
          city: data[SheetColumns.COUNTRY],
          postalCode: data[SheetColumns.POSTAL_CODE].toString(),
          // TODO: has to be added
          country: 'Czech Republic'
          // country: data[SheetColumns]
        }
      },
      recipients: [
        {
          name,
          phone: data[SheetColumns.TEL_NUMBER],
          notes: data[SheetColumns.CUSTOMER_NOTE].toString(),
          skipSMSNotifications: data[SheetColumns.NOTIFICATION]
        }
      ],
      completeAfter: excelDateToJSDate(data[SheetColumns.DELIVER_AFTER]).getTime(),
      completeBefore: excelDateToJSDate(data[SheetColumns.DELIVER_BEFORE]).getTime()
    };
  });
};
