import { format } from 'date-fns';

export const formatToDateAndTime = (timestamp: number | Date) =>
  format(timestamp, 'MM.dd.yyyy hh:mm');