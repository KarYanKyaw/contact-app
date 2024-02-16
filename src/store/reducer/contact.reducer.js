const initialState = {
  loading: false,
  data: null,
  error: null,
};
export const contactReducer = (store = initialState, action) => {
  switch (action.type) {
    case "process": {
      return { ...store, loading: true };
    }
    case "create": {
      return { ...store, loading: false, data: action.payload };
    }
    case "getAll": {
      return { ...store, loading: false, data: action.payload };
    }
    case "error": {
      return { ...store, loading: false, data: action.payload };
    }
    default:
      return store;
  }
};
