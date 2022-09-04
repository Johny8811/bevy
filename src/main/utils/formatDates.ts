import { format } from 'date-fns';

export const formatToDateAndTime = (timestamp: number | Date) =>
  format(timestamp, 'MM.dd.yyyy HH:mm');

export const formatToTime = (timestamp: number | Date) => format(timestamp, 'HH:mm');
