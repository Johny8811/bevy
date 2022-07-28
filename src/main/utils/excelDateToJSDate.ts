// https://stackoverflow.com/a/16233621/17150492
// it seems like it is working correctly, but has to be tested
// TODO: test
export const excelDateToJSDate = (serial: number) => {
  const differenceFromEpochToSeventies = 25569;
  const dayInMilliseconds = 86400;

  const utcDays = Math.floor(serial - differenceFromEpochToSeventies);
  const utcValue = utcDays * dayInMilliseconds;
  const dateInfo = new Date(utcValue * 1000);

  const fractionalDay = serial - Math.floor(serial) + 0.0000001;

  let totalSeconds = Math.floor(dayInMilliseconds * fractionalDay);

  const seconds = totalSeconds % 60;

  totalSeconds -= seconds;

  const hours = Math.floor(totalSeconds / (60 * 60));
  const minutes = Math.floor(totalSeconds / 60) % 60;

  return new Date(
    dateInfo.getFullYear(),
    dateInfo.getMonth(),
    dateInfo.getDate(),
    hours,
    minutes,
    seconds
  );
};
