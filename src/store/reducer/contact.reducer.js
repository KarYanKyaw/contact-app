const initialState = {
  loading: false,
  data: null,
  error: null,
  added: null,
};

export const contactReducer = (store = initialState, action) => {
  switch (action.type) {
    case "process": {
      return { ...store, loading: true, data: null };
    }
    case "getAll": {
      return { ...store, loading: false, data: action.payload };
    }
    case "addNew":
      return { ...store, added: action.payload };
    case "error": {
      return { ...store, loading: false, error: action.payload };
    }
    case "edit": {
      return { ...store, loading: false, data: action.payload };
    }
    case "delete": {
      return { ...store, loading: false, data: action.payload };
    }
    case "reset": {
      return { ...store, loading: false, error: null };
    }
    default: {
      return store;
    }
  }
};
