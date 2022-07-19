import { read, utils } from 'xlsx';

export const transformSheetToOnFleetJSON = async (tasksXlsx: File) => {
  const buff = await tasksXlsx.arrayBuffer();
  const workbook = read(buff);

  const sheetNameList = workbook.SheetNames;
  console.log('==> JSON: ', utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]));
};
