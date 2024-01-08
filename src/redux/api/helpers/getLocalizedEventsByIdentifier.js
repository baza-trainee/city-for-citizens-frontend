export const getLocalizedEventsByIdentifier = (data, _, eventId) => {
  const eventFirst = data.find(({ id }) => id === Number(eventId));
  const eventSecond = data.find(
    ({ idIdentifier, id }) =>
      idIdentifier === eventFirst.idIdentifier && id !== Number(eventId)
  );
  const result = { eventUk: null, eventEn: null };

  if (eventFirst.locale === 'uk_UA') {
    result.eventUk = eventFirst;
    result.eventEn = eventSecond;
  } else {
    result.eventUk = eventSecond;
    result.eventEn = eventFirst;
  }

  return result;
};
