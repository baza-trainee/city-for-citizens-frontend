import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isShowModal: false,
  isShowSuccessMessage: false,
  isShowErrorMessage: false,
  deleteEventData: { id: '', title: '' },
};

export const modalEventSlice = createSlice({
  name: 'modalEvent',
  initialState,
  reducers: {
    startDeleteEvent: (state, { payload: { deleteEventData } }) => {
      state.deleteEventData = deleteEventData;
      state.isShowModal = true;
    },
    closeModal: state => {
      state.isShowModal = false;
    },
    showSuccessMessage: state => {
      state.isShowSuccessMessage = true;
      state.deleteEventData = { id: '', title: '' };
    },
    showErrorMessage: state => {
      state.isShowErrorMessage = true;
      state.deleteEventData = { id: '', title: '' };
    },
    resetState: () => initialState,
  },
});

export const {
  startDeleteEvent,
  closeModal,
  showSuccessMessage,
  showErrorMessage,
  resetState,
} = modalEventSlice.actions;
