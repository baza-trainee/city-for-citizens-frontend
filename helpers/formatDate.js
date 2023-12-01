import { format } from 'date-fns';

const formatDateSeparatorDash = date => format(new Date(date), 'yyyy-MM-dd');

const formatDateSeparatorDot = date => format(new Date(date), 'dd.MM.yyyy');

const formatDateToTime = date => format(new Date(date), 'HH:mm');

export { formatDateSeparatorDash, formatDateSeparatorDot, formatDateToTime };
