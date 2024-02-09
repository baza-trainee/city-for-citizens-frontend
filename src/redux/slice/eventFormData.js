import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  firstLocale: {
    eventTitle: '',
    city: '',
    street: '',
    description: '',
    notes: '',
    eventType: '',
    eventImage: '',
  },
  secundLocale: {
    eventTitle: '',
    city: '',
    street: '',
    description: '',
    notes: '',
    eventType: '',
    eventImage: '',
  },
  common: { time: '', date: '', coordinates: '' },
};

export const eventFormData = createSlice({
  name: 'event_form_data',
  initialState,
  reducers: {
    setEventFormData: (_, { payload }) => payload,
    resetEventFormData: () => initialState,
  },
  selectors: {
    getEventFormData: state => state,
  },
});

export const { setEventFormData, resetEventFormData } = eventFormData.actions;
export const { getEventFormData } = eventFormData.selectors;
