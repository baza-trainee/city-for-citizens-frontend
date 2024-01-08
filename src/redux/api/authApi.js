import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/helpers/constants';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    method: 'POST',
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json;charset=utf-8');

      return headers;
    },
  }),

  endpoints: builder => ({
    // login
    login: builder.mutation({
      query: credentials => {
        return {
          url: 'login',

          body: JSON.stringify(credentials),
        };
      },
    }),

    // registration
    registration: builder.mutation({
      query: credentials => {
        return {
          url: 'registration',

          body: JSON.stringify(credentials),
        };
      },
    }),

    // refresh
    refresh: builder.query({
      query: () => {
        return { url: 'refresh' };
      },
    }),

    // logout
    logout: builder.mutation({
      query: () => {
        return { url: 'logout' };
      },
    }),

    //
    requestPasswordReset: builder.mutation({
      query: credentials => {
        return {
          url: 'passwordReset/request',

          body: JSON.stringify(credentials),
        };
      },
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useLazyRefreshQuery,
  useLogoutMutation,
  useRequestPasswordResetMutation,
} = authApi;
