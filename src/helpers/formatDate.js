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

const formatDateToDMY = dateTimeString => {
  const date = new Date(dateTimeString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export {
  formatDateSeparatorDash,
  formatDateSeparatorDot,
  formatDateToTime,
  formatTime,
  formatDateToDMY,
};
