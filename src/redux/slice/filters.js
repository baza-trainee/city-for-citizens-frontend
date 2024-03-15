import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  city: '',
  date: '',
  eventType: '',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, { payload }) => ({ ...state, ...payload }),

    resetState: () => initialState,
  },
});

export const { setFilters, resetState } = filtersSlice.actions;

export const selectFilters = state => state.filtersSlice;
