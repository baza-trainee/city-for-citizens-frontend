export const addTokenToHeaders = (headers, { type, getState }) => {
  if (type === 'query') {
    return headers;
  }
  const token = getState().authSlice.accessToken;
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }
  return headers;
};
