// import { BASE_URL } from '@/helpers/constants';

// const fetchData = async ({ url, method, credential = null }) => {
//   const options = {
//     method,
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//   };

//   if (credential) {
//     options.body = JSON.stringify(credential);
//   }

//   try {
//     const response = await fetch(`${BASE_URL}${url}`, options);
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(
//         errorData.message || errorData || 'Network response was not ok.'
//       );
//     }
//     return response.json();
//   } catch (error) {
//     throw new Error(`Fetch error: ${error.message}`);
//   }
// };

// export const refresh = async () => {
//   return fetchData({ url: '/refresh', method: 'POST' });
// };

// export const register = async credential => {
//   return fetchData({ url: '/registration', method: 'POST', credential });
// };

// export const login = async credential => {
//   return fetchData({ url: '/login', method: 'POST', credential });
// };

// export const logout = async () => {
//   return fetchData({ url: '/logout', method: 'POST' });
// };

// // export const activation = async () => {
// //   return fetchData('/', 'POST');
// // };

// export const requestPasswordReset = async credential => {
//   return fetchData({
//     url: '/passwordReset/request',
//     method: 'POST',
//     credential,
//   });
// };

// export const passwordReset = async () => {
//   return fetchData('/', 'POST');
// };
