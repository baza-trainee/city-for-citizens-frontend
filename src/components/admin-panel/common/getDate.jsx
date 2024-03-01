export default function getDate(serverDate, isPartner = false) {
  const date = new Date(serverDate);
  let hours = date.getHours();
  switch (hours) {
    case 0:
      hours = 22;
      break;
    case 1:
      hours = 23;
      break;
    default:
      hours = hours - 2;
  }
  return `${formatDate(date.getDate())}.${formatDate(date.getMonth() + 1)}.${date.getFullYear()} \u00A0\u00A0\u00A0 ${isPartner ? formatDate(null, date.getHours()) : formatDate(null, hours)}:${formatDate(null, date.getMinutes())}`;
}

function formatDate(dateElStartZero, dateElEndZero) {
  if (dateElStartZero) return String(dateElStartZero).padStart(2, '0');
  return String(dateElEndZero).padStart(2, '0');
}
