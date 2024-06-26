import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  firstLocale: {
    eventTitle: '',
    city: '',
    street: '',
    description: '',
    notes: '',
    eventTypeId: '',
    eventImage: '',
  },
  secondLocale: {
    eventTitle: '',
    city: '',
    street: '',
    description: '',
    notes: '',
    eventTypeId: '',
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
});

export const { setEventFormData, resetEventFormData } = eventFormData.actions;
