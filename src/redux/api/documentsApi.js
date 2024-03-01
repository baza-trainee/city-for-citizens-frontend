import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/helpers/constants';
import { addTokenToHeaders } from './helpers/addTokenToHeaders';

export const documentsApi = createApi({
  reducerPath: 'documentsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: addTokenToHeaders,
  }),
  tagTypes: ['Documents'],
  endpoints: builder => ({
    //
    getDocuments: builder.query({
      query: () => {
        return { url: 'documents', method: 'GET' };
      },
    }),
    //
    updateDocuments: builder.mutation({
      query: ({ body, documentId }) => {
        return {
          url: `documents/${documentId}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: ['Documents'],
    }),
  }),
});

export const { useGetDocumentsQuery, useUpdateDocumentsMutation } =
  documentsApi;
