export const generateQueryStr = (baseString, query) => {
  const objectEntries = Object.entries(query);
  if (objectEntries.length === 0) {
    return baseString;
  }
  const queryString =
    baseString +
    '?' +
    objectEntries.map(([key, value]) => `${key}=${value}`).join('&');

  return queryString;
};
