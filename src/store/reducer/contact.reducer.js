import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  data: null,
  creationError: null,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    processing: (store) => {
      store.loading = true;
    },
    getAll: (store, action) => {
      store.loading = false;
      store.data = action.payload;
    },
    // issue means error
    issue: (store, action) => {
      store.loading = false;
      store.error = action.payload;
    },
    creationIssue: (store, action) => {
      store.loading = false;
      store.creationError = action.payload;
    },
    clearError: (store) => {
      store.loading = false;
      store.error = null;
      store.data = null;
      store.creationError = null;
    },
  },
});

export const { getAll, issue, processing, creationIssue, clearError } =
  contactSlice.actions;

export default contactSlice.reducer;
