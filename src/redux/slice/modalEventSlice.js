import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isShowModal: false,
  isShowSuccessMessage: false,
  isShowErrorMessage: false,
  idEvent: null,
};

export const modalEventSlice = createSlice({
  name: 'modalEvent',
  initialState,
  reducers: {
    startDeleteEvent: (state, { payload: idEvent }) => {
      state.idEvent = idEvent;
      state.isShowModal = true;
    },
    closeModal: state => {
      state.isShowModal = false;
    },
    showSuccessMessage: state => {
      state.isShowSuccessMessage = true;
      state.idEvent = null;
    },
    showErrorMessage: state => {
      state.isShowErrorMessage = true;
      state.idEvent = null;
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
