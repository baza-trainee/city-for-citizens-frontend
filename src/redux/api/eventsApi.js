import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/helpers/constants';
import { addTokenToHeaders } from './helpers/addTokenToHeaders';
import { generateQueryStr } from './helpers/generateQueryStr';
import { getLocalizedEventsByIdentifier } from './helpers/getLocalizedEventsByIdentifier';

export const eventsApi = createApi({
  reducerPath: 'eventsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: addTokenToHeaders,
  }),
  tagTypes: ['Events'],
  endpoints: builder => ({
    //
    getAllEvents: builder.query({
      query: () => {
        return { url: 'events', method: 'GET' };
      },
    }),

    //
    getAllEventsByLocale: builder.query({
      query: locale => {
        const queryStr = generateQueryStr('events', locale);

        return { url: queryStr, method: 'GET' };
      },
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Events', id })),
              { type: 'Events', id: 'LIST' },
            ]
          : [{ type: 'Events', id: 'LIST' }],
    }),

    //
    getEventsById: builder.query({
      query: () => {
        return { url: 'events', method: 'GET' };
      },

      transformResponse: getLocalizedEventsByIdentifier,
    }),

    //
    getEventsBySearchParams: builder.query({
      query: ({ queryParams, locale }) => {
        if (Object.keys(queryParams).length === 0) return {};

        const queryStr = generateQueryStr('events', { ...queryParams, locale });

        return { url: queryStr, method: 'GET' };
      },
    }),

    //
    createEvent: builder.mutation({
      query: body => {
        return {
          url: 'events',
          method: 'POST',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Events', id: 'LIST' }],
    }),

    //
    updateEvent: builder.mutation({
      query: ({ body, eventId }) => {
        return {
          url: `events/${eventId}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Events', id: 'LIST' }],
    }),

    //
    deleteEvent: builder.mutation({
      query: eventId => {
        return {
          url: `events/${eventId}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Events', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetAllEventsByLocaleQuery,
  useGetEventsBySearchParamsQuery,
  useGetEventsByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
