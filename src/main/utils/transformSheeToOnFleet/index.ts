import { read, utils } from 'xlsx';
import OnFleet from '@onfleet/node-onfleet';
import { RawSheetData, SheetColumns } from '../../types/tasksSheet';

import { excelDateToJSDate } from '../excelDateToJSDate';

export const transformSheetToOnFleet = async (
  tasksXlsx: File
): Promise<Parameters<OnFleet['tasks']['batchCreate']>[0]> => {
  const buff = await tasksXlsx.arrayBuffer();
  const workbook = read(buff);

  const sheetNameList = workbook.SheetNames;
  const parsedSheetData = utils.sheet_to_json<RawSheetData>(workbook.Sheets[sheetNameList[0]]);

  // FIXME: to check types, remove @ts-ignore and comment metadata key
  //  ! ts doesn't know properties of "metadata" because union in interface !
  // @ts-ignore
  return parsedSheetData.map((data) => {
    // Destination
    const number = data[SheetColumns.HOUSE_NUMBER]?.toString() || '';
    const street = data[SheetColumns.STREET] || '';
    const city = data[SheetColumns.CITY] || '';
    const postalCode = data[SheetColumns.POSTAL_CODE]?.toString();
    const country = data[SheetColumns.COUNTRY] || '';

    // Recipients
    const quantity = data[SheetColumns.QUANTITY] || 1;
    const name = `${data[SheetColumns.CUSTOMER_NAME]} ${quantity}ks`;
    const phone = data[SheetColumns.TEL_NUMBER]?.toString() || '';
    const recipientNotes = data[SheetColumns.CUSTOMER_NOTE];
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

    // Metadata
    const metadata = [
      {
        name: 'User ID',
        type: 'string',
        visibility: ['api'],
        // TODO: add user uniq ID
        value: 'abcd1234'
      }
    ];

    return {
      destination: {
        address: {
          number,
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
      quantity,
      metadata
    };
  });
};
