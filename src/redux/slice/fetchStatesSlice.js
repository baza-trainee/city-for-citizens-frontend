import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
};

export const appStatusSlice = createSlice({
  name: 'app_status',
  initialState,
  reducers: {
    setAppStatus: (
      state,
      { payload: { isLoading = false, isError = false, error = null } }
    ) => {
      state.isLoading = isLoading;
      state.isError = isError;
      state.error = error;
    },
  },
});

export const { setAppStatus } = appStatusSlice.actions;
