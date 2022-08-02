import { read, utils } from 'xlsx';
import OnFleet from '@onfleet/node-onfleet';
import { parseStreet } from '../parseStreet';
import { RawSheetData, SheetColumns } from '../../types/tasksSheet';

import { excelDateToJSDate } from '../excelDateToJSDate';

export const transformSheetToOnFleet = async (
  tasksXlsx: File
): Promise<Parameters<OnFleet['tasks']['batchCreate']>[0]> => {
  const buff = await tasksXlsx.arrayBuffer();
  const workbook = read(buff);

  const sheetNameList = workbook.SheetNames;
  const parsedSheetData = utils.sheet_to_json<RawSheetData>(workbook.Sheets[sheetNameList[0]]);

  return parsedSheetData.map((data) => {
    // Destination
    const { street, streetNo } = parseStreet(data[SheetColumns.ADDRESS_STREET] || '');
    // TODO: "SheetColumns.COUNTRY" should be changed to name "SheetColumns.CITY"
    const city = data[SheetColumns.COUNTRY] || '';
    const postalCode = data[SheetColumns.POSTAL_CODE]?.toString();
    const country = 'Czech Republic';

    // Recipients
    const quantity = data[SheetColumns.QUANTITY] || 1;
    const name = `${data[SheetColumns.CUSTOMER_NAME]} ${quantity}ks`;
    const phone = data[SheetColumns.TEL_NUMBER]?.toString() || '';
    const recipientNotes = data[SheetColumns.CUSTOMER_NOTE]?.toString();
    const skipSMSNotifications = data[SheetColumns.NOTIFICATION];

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
      destination: {
        address: {
          number: streetNo,
          street,
          city,
          postalCode,
          country
        }
      },
      recipients: [
        {
          name,
          phone,
          notes: recipientNotes,
          skipSMSNotifications
        }
      ],
      completeAfter,
      completeBefore,
      quantity
    };
  });
};
