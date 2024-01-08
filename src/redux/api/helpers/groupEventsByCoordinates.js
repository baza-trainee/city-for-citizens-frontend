export const groupEventsByCoordinates = response => {
  const result = Object.values(
    response.reduce((acc, obj) => {
      const key = obj.eventAddress.coordinates
        .split(',')
        .map(item => parseFloat(item).toFixed(5))
        .join(', ');

      if (!acc[key]) {
        acc[key] = {
          idIdentifier: obj.idIdentifier + 'abc',
          eventAddress: { coordinates: key },
          sameAddress: [obj],
        };
      } else {
        acc[key].sameAddress.push(obj);
      }
      return acc;
    }, {})
  ).map(el => {
    if (el.sameAddress.length > 1) {
      return el;
    } else {
      return el.sameAddress[0];
    }
  });
  return result;
};
