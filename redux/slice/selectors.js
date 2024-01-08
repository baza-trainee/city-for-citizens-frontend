// authSlice
export const selectUserEmail = state => state.authSlice.user.email;
export const selectToken = state => state.authSlice.accessToken;
export const selectIsLoggedIn = state => state.authSlice.isLoggedIn;

// appStatusSlice
export const selectIsLoading = state => state.appStatusSlice.isLoading;
export const selectIsError = state => state.appStatusSlice.isError;
export const selectError = state => state.appStatusSlice.error;
