import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query';
import { filtersApi } from './api/filtersApi';
import { eventsApi } from './api/eventsApi';

import { authApi } from './api/authApi';
import { authSlice } from './slice/authSlice';
import { appStatusSlice } from './slice/fetchStatesSlice';
import { imageApi } from './api/imageApi';
import { contactsApi } from './api/contactsApi';
import { documentsApi } from './api/documentsApi';
import { typesEventApi } from './api/typesEventApi';
import { eventFormData } from './slice/eventFormData';
import { partnersApi } from './api/partnersApi';
import { filtersSlice } from './slice/filters';

export const store = configureStore({
  reducer: {
    [filtersApi.reducerPath]: filtersApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
    [typesEventApi.reducerPath]: typesEventApi.reducer,
    [partnersApi.reducerPath]: partnersApi.reducer,
    appStatusSlice: appStatusSlice.reducer,
    eventFormData: eventFormData.reducer,
    filtersSlice: filtersSlice.reducer,
    authSlice: authSlice.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({}).concat(
      filtersApi.middleware,
      eventsApi.middleware,
      authApi.middleware,
      imageApi.middleware,
      contactsApi.middleware,
      documentsApi.middleware,
      typesEventApi.middleware,
      partnersApi.middleware
    ),
});

setupListeners(store.dispatch);
