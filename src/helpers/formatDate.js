import { format } from 'date-fns';

const formatDateSeparatorDash = date => format(new Date(date), 'yyyy-MM-dd');

const formatDateSeparatorDot = date => format(new Date(date), 'dd.MM.yyyy');
const formatTime = time => {
  const [hours, minutes] = time.split(':');

  return `${parseInt(hours, 10)}:${minutes}`;
};

const formatDateToTime = date => {
  const parsedDate = new Date(date);
  const hours = parsedDate.getUTCHours();
  const minutes = parsedDate.getUTCMinutes();

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;

  return formattedTime;
};

export {
  formatDateSeparatorDash,
  formatDateSeparatorDot,
  formatDateToTime,
  formatTime,
};
