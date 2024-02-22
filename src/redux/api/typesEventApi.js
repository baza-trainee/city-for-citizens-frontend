import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/helpers/constants';
import { addTokenToHeaders } from './helpers/addTokenToHeaders';
import { generateQueryStr } from './helpers/generateQueryStr';

export const typesEventApi = createApi({
  reducerPath: 'typesEventApi',

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: addTokenToHeaders,
  }),
  tagTypes: ['TypesEvent'],
  endpoints: builder => ({
    //
    getTypesEvent: builder.query({
      query: () => {
        return { url: 'event-types', method: 'GET' };
      },
      providesTags: result => {
        return result.eventTypes
          ? [
              ...result.eventTypes.map(({ id }) => ({
                type: 'TypesEvent',
                id,
              })),
              { type: 'TypesEvent', id: 'LIST' },
            ]
          : [{ type: 'TypesEvent', id: 'LIST' }];
      },
    }),

    //
    getTypesEventByLocale: builder.query({
      query: ({ locale }) => {
        const queryStr = generateQueryStr('event-types', { locale });

        return { url: queryStr, method: 'GET' };
      },

      providesTags: result => {
        return result
          ? [
              ...result.map(({ id }) => ({
                type: 'TypesEvent',
                id,
              })),
              { type: 'TypesEvent', id: 'LIST' },
            ]
          : [{ type: 'TypesEvent', id: 'LIST' }];
      },

      transformResponse: ({ eventTypes }) => eventTypes,
    }),

    //
    getAllTypeEventsByPage: builder.query({
      query: (limit, page) => {
        const queryStr = generateQueryStr('event-types', limit, page);

        return { url: queryStr, method: 'GET' };
      },
      providesTags: result => {
        return result.events
          ? [
              ...result.map(({ id }) => ({
                type: 'TypesEvent',
                id,
              })),
              { type: 'TypesEvent', id: 'LIST' },
            ]
          : [{ type: 'TypesEvent', id: 'LIST' }];
      },
    }),

    //
    getTypesEventByIdForUpdateForm: builder.query({
      query: typeEventId => {
        return { url: `event-types/${typeEventId}`, method: 'GET' };
      },
      providesTags: [{ type: 'TypesEvent', id: 'LIST' }],
      transformResponse: res => res.eventTypes,
    }),
    //
    createTypeEvent: builder.mutation({
      query: body => {
        return {
          url: 'event-types',
          method: 'POST',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'TypesEvent', id: 'LIST' }],
    }),

    //
    updateTypesEvent: builder.mutation({
      query: ({ body, typeEventId }) => {
        return {
          url: `event-types/${typeEventId}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'TypesEvent', id: 'LIST' }],
    }),
    //
    deleteTypeEvent: builder.mutation({
      query: eventTypeId => {
        return {
          url: `event-types/${eventTypeId}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'TypesEvent', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTypesEventQuery,
  useGetTypesEventByIdForUpdateFormQuery,
  useGetAllTypeEventsByPageQuery,
  useLazyGetTypesEventByIdForUpdateFormQuery,
  useCreateTypeEventMutation,
  useUpdateTypesEventMutation,
  useDeleteTypeEventMutation,
  useGetTypesEventByLocaleQuery,
} = typesEventApi;
