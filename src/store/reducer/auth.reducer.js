const initialState = {
  loading: false,
  auth: false,
  data: null,
  error: null,
};

export const authReducer = (store = initialState, action) => {
  switch (action.type) {
    case "process": {
      return { ...store, loading: true };
    }
    case "register": {
      return { ...store, data: action.payload };
    }
    case "login": {
      return { ...store, auth: true, data: action.payload };
    }
    case "error": {
      return { ...store, loading: false, error: action.payload };
    }
    case "logout": {
      localStorage.removeItem("auth");
      return { ...store, loading: false, data: null };
    }

    default: {
      return store;
    }
  }
};
