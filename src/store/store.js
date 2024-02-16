import { thunk } from "redux-thunk";
import { authReducer } from "./reducer/auth.reducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { contactReducer } from "./reducer/contact.reducer";

const reducer = combineReducers({
  auth: authReducer,
  contact: contactReducer,
});

export const store = createStore(reducer, {}, applyMiddleware(thunk));
