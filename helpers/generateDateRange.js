import { formatDateSeparatorDash } from './formatDate';

export const generateDateRange = (start, end, activeDates) => {
  const dateRange = [];
  let currentDate = new Date(start);
  const lastDate = new Date(end);

  while (currentDate <= lastDate) {
    const date = formatDateSeparatorDash(currentDate);
    if (!activeDates) {
      dateRange.push(date);
    } else if (activeDates.includes(date)) {
      dateRange.push(date);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRange;
};
