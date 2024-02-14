import { formatDateSeparatorDash, formatDateToTime } from '@/helpers';

export default function getTransformsForUpdateForm(data, _, { eventId }) {
  const eventFirst = data.events.find(({ id }) => id === Number(eventId));
  const eventSecond = data.events.find(
    ({ idIdentifier, id }) =>
      idIdentifier === eventFirst.idIdentifier && id !== Number(eventId)
  );

  function sortByLocale(first, second) {
    return first.locale === 'uk_UA'
      ? { firstLocale: first, secondLocale: second }
      : { firstLocale: second, secondLocale: first };
  }

  const { firstLocale, secondLocale } = sortByLocale(eventFirst, eventSecond);

  function getDataForLocale({
    id,
    eventTitle,
    eventAddress: { city, street, notes },
    description,
    eventTypes,
    eventImage,
  }) {
    return {
      id,
      eventTitle,
      city,
      street,
      description,
      notes,
      eventType: eventTypes.map(({ eventType }) => eventType.trim()).join(', '),
      eventImage,
    };
  }

  function getCommonData({
    dateTime,

    idIdentifier,
    eventAddress: { coordinates },
  }) {
    return {
      date: formatDateSeparatorDash(dateTime),
      time: formatDateToTime(dateTime),
      coordinates,
      idIdentifier,
    };
  }

  const initialFormData = {
    firstLocale: getDataForLocale(firstLocale),
    secondLocale: getDataForLocale(secondLocale),
    common: getCommonData(firstLocale),
  };

  return initialFormData;
}
