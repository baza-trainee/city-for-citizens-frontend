import { format } from 'date-fns';

export const formatDate = date => format(date, 'yyyy-MM-dd');

export const formatDateSeparatorDot = date =>
  format(new Date(date), 'dd.MM.yyyy');

export const formatDateToTime = date => format(new Date(date), 'KK:mm');
