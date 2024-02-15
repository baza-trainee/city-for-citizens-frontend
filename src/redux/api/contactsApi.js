import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/helpers/constants';
import { addTokenToHeaders } from './helpers/addTokenToHeaders';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: addTokenToHeaders,
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    //
    getContacts: builder.query({
      query: () => {
        return { url: 'contacts', method: 'GET' };
      },
    }),
    //
    updateContacts: builder.mutation({
      query: ({ body }) => {
        return {
          url: `contacts`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const { useGetContactsQuery, useUpdateContactsMutation } = contactsApi;
