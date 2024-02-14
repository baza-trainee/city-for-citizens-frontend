import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query';
import { filtersApi } from './api/filtersApi';
import { eventsApi } from './api/eventsApi';

import { authApi } from './api/authApi';
import { authSlice } from './slice/authSlice';
import { appStatusSlice } from './slice/fetchStatesSlice';
import { imageApi } from './api/imageApi';
import { contactsApi } from './api/contactsApi';
import { eventFormData } from './slice/eventFormData';

export const store = configureStore({
  reducer: {
    [filtersApi.reducerPath]: filtersApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    appStatusSlice: appStatusSlice.reducer,
    eventFormData: eventFormData.reducer,

    authSlice: authSlice.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({}).concat(
      filtersApi.middleware,
      eventsApi.middleware,
      authApi.middleware,
      imageApi.middleware,
      contactsApi.middleware
    ),
});

setupListeners(store.dispatch);
