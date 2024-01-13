import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/helpers/constants';
import { addTokenToHeaders } from './helpers/addTokenToHeaders';
import { generateQueryStr } from './helpers/generateQueryStr';
import { getLocalizedEventsByIdentifier } from './helpers/getLocalizedEventsByIdentifier';
import { groupEventsByCoordinates } from './helpers/groupEventsByCoordinates';
import { formatDateSeparatorDash, formatDateToTime } from '@/helpers';

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
      providesTags: result => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: 'Events', id })),
              { type: 'Events', id: 'LIST' },
            ]
          : [{ type: 'Events', id: 'LIST' }];
      },
    }),

    //
    getEventsById: builder.query({
      query: () => {
        return { url: 'events', method: 'GET' };
      },

      transformResponse: getLocalizedEventsByIdentifier,
    }),

    //
    getEventsByIdForUpdateForm: builder.query({
      query: () => {
        return { url: 'events', method: 'GET' };
      },

      providesTags: result => {
        return result
          ? [
              ...(result.firstLocale
                ? [{ type: 'Events', id: result.firstLocale.id }]
                : []),
              ...(result.secundLocale
                ? [{ type: 'Events', id: result.secundLocale.id }]
                : []),
              { type: 'Events', id: 'LIST' },
            ]
          : [{ type: 'Events', id: 'LIST' }];
      },

      transformResponse: (data, _, eventId) => {
        const eventFirst = data.find(({ id }) => id === Number(eventId));
        const eventSecond = data.find(
          ({ idIdentifier, id }) =>
            idIdentifier === eventFirst.idIdentifier && id !== Number(eventId)
        );

        const result = { firstLocale: null, secundLocale: null };

        if (eventFirst.locale === 'uk_UA') {
          result.firstLocale = eventFirst;
          result.secundLocale = eventSecond;
        } else {
          result.firstLocale = eventSecond;
          result.secundLocale = eventFirst;
        }

        const initialFormData = {
          firstLocale: {
            id: result.firstLocale.id,
            eventTitle: result.firstLocale.eventTitle,
            city: result.firstLocale.eventAddress.city,
            street: result.firstLocale.eventAddress.street,
            description: result.firstLocale.description,
            notes: result.firstLocale.eventAddress.notes,
            eventType: result.firstLocale.eventTypes
              .map(({ eventType }) => eventType.trim())
              .join(', '),
            eventImageName: result.firstLocale.eventImage,
            eventImage: '',
          },

          secundLocale: {
            id: result.secundLocale.id,
            eventTitle: result.secundLocale.eventTitle,
            city: result.secundLocale.eventAddress.city,
            street: result.secundLocale.eventAddress.street,
            description: result.secundLocale.description,
            notes: result.secundLocale.eventAddress.notes,
            eventType: result.secundLocale.eventTypes
              .map(({ eventType }) => eventType.trim())
              .join(', '),
            eventImageName: result.secundLocale.eventImage,
            eventImage: '',
          },

          common: {
            date: formatDateSeparatorDash(result.firstLocale.dateTime),
            time: formatDateToTime(result.firstLocale.dateTime),
            coordinates: result.firstLocale.eventAddress.coordinates,
            eventUrl: result.firstLocale.eventUrl,
            idIdentifier: result.firstLocale.idIdentifier,
          },
        };

        // initialFormData

        return initialFormData;
      },
    }),

    //
    getEventsBySearchParams: builder.query({
      query: ({ queryParams, locale }) => {
        if (Object.keys(queryParams).length === 0) return {};

        const queryStr = generateQueryStr('events', { ...queryParams, locale });

        return { url: queryStr, method: 'GET' };
      },
      transformResponse: groupEventsByCoordinates,
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
  useGetEventsByIdForUpdateFormQuery,
} = eventsApi;
