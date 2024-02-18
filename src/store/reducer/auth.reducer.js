import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    processing: (store) => {
      store.loading = true;
    },
    login: (store, action) => {
      store.loading = false;
      store.data = action.payload;
    },
    logout: (store) => {
      store.loading = false;
      store.data = null;
    },
    // issue means error
    issue: (store, action) => {
      store.loading = false;
      store.error = action.payload;
    },
    reset: (store) => {
      store.loading = false;
      store.error = null;
      store.data = null;
    },
  },
});

export const { processing, issue, login,reset, logout } = authSlice.actions;

export default authSlice.reducer;
