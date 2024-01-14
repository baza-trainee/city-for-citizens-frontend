import { formatDateSeparatorDash, formatDateToTime } from '@/helpers';

export const getTransformsForUpdateForm = (data, _, eventId) => {
  const eventFirst = data.find(({ id }) => id === Number(eventId));
  const eventSecond = data.find(
    ({ idIdentifier, id }) =>
      idIdentifier === eventFirst.idIdentifier && id !== Number(eventId)
  );

  const sortByLocale = (first, second) =>
    first.locale === 'uk_UA'
      ? { firstLocale: first, secundLocale: second }
      : { firstLocale: second, secundLocale: first };

  const { firstLocale, secundLocale } = sortByLocale(eventFirst, eventSecond);

  const getDataForLocale = ({
    id,
    eventTitle,
    eventAddress: { city, street, notes },
    description,
    eventTypes,
    eventImage,
  }) => ({
    id,
    eventTitle,
    city,
    street,
    description,
    notes,
    eventType: eventTypes.map(({ eventType }) => eventType.trim()).join(', '),
    eventImageName: eventImage,
    eventImage: '',
  });

  const getCommonData = ({
    dateTime,
    eventUrl,
    idIdentifier,
    eventAddress: { coordinates },
  }) => ({
    date: formatDateSeparatorDash(dateTime),
    time: formatDateToTime(dateTime),
    coordinates,
    eventUrl,
    idIdentifier,
  });

  const initialFormData = {
    firstLocale: getDataForLocale(firstLocale),

    secundLocale: getDataForLocale(secundLocale),

    common: getCommonData(firstLocale),
  };

  return initialFormData;
};
