import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/helpers/constants';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    method: 'POST',
    prepareHeaders: (headers, { getState, endpoint }) => {
      headers.set('Content-Type', 'application/json;charset=utf-8');

      if (endpoint === 'changePassword') {
        const token = getState().authSlice.accessToken;
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
      }

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
    //
    passwordReset: builder.mutation({
      query: credentials => {
        return {
          url: 'passwordReset/reset',

          body: JSON.stringify(credentials),
        };
      },
    }),
    //
    changePassword: builder.mutation({
      query: credentials => {
        return {
          url: 'password/change',
          body: JSON.stringify(credentials),
        };
      },
      providesTags: ['changePassword'],
    }),
    //
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useLazyRefreshQuery,
  useLogoutMutation,
  useRequestPasswordResetMutation,
  usePasswordResetMutation,
  useChangePasswordMutation,
} = authApi;
