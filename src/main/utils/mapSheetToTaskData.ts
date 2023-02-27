import { read, utils } from 'xlsx';
import { CreateTaskProps, RawSheetData, SheetColumns } from '../types/tasks';

import { excelDateToJSDate } from './excelDateToJSDate';

export const mapSheetToTaskData = async (
  tasksXlsx: File,
  userNamePrefix?: string | null
): Promise<CreateTaskProps[]> => {
  const buff = await tasksXlsx.arrayBuffer();
  const workbook = read(buff);

  const sheetNameList = workbook.SheetNames;
  const parsedSheetData = utils.sheet_to_json<RawSheetData>(workbook.Sheets[sheetNameList[0]]);

  return parsedSheetData.map((data) => {
    // Recipients
    const quantity = data[SheetColumns.QUANTITY] || 1;
    const name = `${userNamePrefix ? `${userNamePrefix} - ` : ''}${
      data[SheetColumns.CUSTOMER_NAME]
    } ${quantity}ks`;
    const phone = data[SheetColumns.TEL_NUMBER]?.toString() || '';
    const recipientNote = data[SheetColumns.CUSTOMER_NOTE];
    const skipSMSNotifications = !data[SheetColumns.NOTIFICATION];

    // Destination
    const number = data[SheetColumns.HOUSE_NUMBER]?.toString() || '';
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

    const pickupTask = data[SheetColumns.PICKUP_TASK] || false;
    const skipPhoneValidation = data[SheetColumns.SKIP_PHONE_VALIDATION] || false;

    return {
      recipients: [
        {
          name,
          phone: skipPhoneValidation ? `+${phone}` : phone,
          notes: recipientNote,
          skipSMSNotifications,
          skipPhoneNumberValidation: skipPhoneValidation
        }
      ],
      destination: {
        address: {
          number,
          street,
          city,
          postalCode,
          country
        }
      },
      completeAfter,
      completeBefore,
      quantity,
      pickupTask
    };
  });
};
