import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query';
import { filtersApi } from './api/filtersApi';
import { eventsApi } from './api/eventsApi';

import { authApi } from './api/authApi';
import { authSlice } from './slice/authSlice';
import { appStatusSlice } from './slice/fetchStatesSlice';
import { imageApi } from './api/imageApi';
import { modalEventSlice } from './slice/modalEventSlice';

export const store = configureStore({
  reducer: {
    [filtersApi.reducerPath]: filtersApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    appStatusSlice: appStatusSlice.reducer,

    authSlice: authSlice.reducer,
    modalEventSlice: modalEventSlice.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({}).concat(
      filtersApi.middleware,
      eventsApi.middleware,
      authApi.middleware,
      imageApi.middleware
    ),
});

setupListeners(store.dispatch);
