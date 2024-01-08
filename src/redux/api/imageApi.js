import { BASE_URL } from '@/helpers/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addTokenToHeaders } from './helpers/addTokenToHeaders';

export const imageApi = createApi({
  reducerPath: 'imageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',

    prepareHeaders: addTokenToHeaders,
  }),

  endpoints: builder => ({
    //
    createImage: builder.mutation({
      query: body => {
        return {
          url: `image`,
          method: 'POST',
          body,
        };
      },
    }),

    //
    deleteImage: builder.mutation({
      query: body => {
        return {
          url: `image`,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        };
      },
    }),
  }),
});

export const { useCreateImageMutation, useDeleteImageMutation } = imageApi;
