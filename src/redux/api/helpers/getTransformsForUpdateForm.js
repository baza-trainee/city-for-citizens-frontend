import { formatDateSeparatorDash, formatDateToTime } from '@/helpers';

export default function getTransformsForUpdateForm(data, _, eventId) {
  const eventFirst = data.find(({ id }) => id === Number(eventId));
  const eventSecond = data.find(
    ({ idIdentifier, id }) =>
      idIdentifier === eventFirst.idIdentifier && id !== Number(eventId)
  );

  function sortByLocale(first, second) {
    return first.locale === 'uk_UA'
      ? { firstLocale: first, secundLocale: second }
      : { firstLocale: second, secundLocale: first };
  }

  const { firstLocale, secundLocale } = sortByLocale(eventFirst, eventSecond);

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
      eventImageName: eventImage,
      eventImage: '',
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
    secundLocale: getDataForLocale(secundLocale),
    common: getCommonData(firstLocale),
  };

  return initialFormData;
}
