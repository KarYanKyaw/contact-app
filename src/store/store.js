import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./reducer/contact.reducer";
import authReducer from "./reducer/auth.reducer";

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    auth: authReducer,
  },
});
