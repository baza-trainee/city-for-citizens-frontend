import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/helpers/constants';
import { addTokenToHeaders } from './helpers/addTokenToHeaders';

export const partnersApi = createApi({
  reducerPath: 'partnersApi',

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: addTokenToHeaders,
  }),
  tagTypes: ['Partners'],
  endpoints: builder => ({
    //
    getPartners: builder.query({
      query: () => {
        return { url: 'partners', method: 'GET' };
      },
      providesTags: result => {
        return result
          ? [
              ...result.map(({ id }) => ({
                type: 'Partners',
                id,
              })),
              { type: 'Partners', id: 'LIST' },
            ]
          : [{ type: 'Partners', id: 'LIST' }];
      },
    }),

    //
    getPartnersByIdForUpdateForm: builder.query({
      query: partnerId => {
        return { url: `partners?id=${partnerId}`, method: 'GET' };
      },
      providesTags: [{ type: 'Partners', id: 'LIST' }],
      transformResponse: res => res[0],
    }),
    //
    createPartner: builder.mutation({
      query: body => {
        return {
          url: 'partners',
          method: 'POST',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Partners', id: 'LIST' }],
    }),

    //
    updatePartner: builder.mutation({
      query: ({ body, partnerId }) => {
        return {
          url: `partners/${partnerId}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Partners', id: 'LIST' }],
    }),
    //
    deletePartner: builder.mutation({
      query: partnerId => {
        return {
          url: `partners/${partnerId}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Partners', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPartnersQuery,
  useGetPartnersByIdForUpdateFormQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = partnersApi;
