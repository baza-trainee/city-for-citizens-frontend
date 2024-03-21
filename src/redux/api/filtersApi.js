import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/helpers/constants';
import { generateQueryStr } from './helpers/generateQueryStr';

export const filtersApi = createApi({
  reducerPath: 'filtersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  endpoints: builder => ({
    //
    getAllFilters: builder.query({
      query: queryParams => {
        const queryStr = generateQueryStr('filters', queryParams);

        return { url: queryStr };
      },
    }),

    //
    getTypesEvents: builder.query({
      query: queryParams => {
        const queryStr = generateQueryStr('filters', queryParams);

        return { url: queryStr };
      },
      transformResponse: ({ eventTypes }) => eventTypes,
    }),
    //
    getAllFiltersByLocale: builder.query({
      query: locale => {
        const queryStr = generateQueryStr('filters', locale);

        return { url: queryStr };
      },
      //transformResponse: ({ eventTypes }) => eventTypes,
    }),
  }),
});

export const {
  useGetAllFiltersQuery,
  useGetTypesEventsQuery,
  useGetAllFiltersByLocaleQuery,
} = filtersApi;
