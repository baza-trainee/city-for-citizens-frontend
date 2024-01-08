import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  user: {
    email: null,
    isActivated: false,
  },
  accessToken: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user, accessToken } }) => {
      state.user = user;
      state.accessToken = accessToken;
      state.isLoggedIn = true;
    },
    resetState: () => initialState,
  },
});

export const { setCredentials, resetState } = authSlice.actions;
