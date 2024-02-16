import { api } from "@/service/api";

export const registerAction = async (dispatch, formData) => {
  try {
    dispatch({ type: "process" });
    const res = await api.post("/register", formData);
    if (res.data) {
      dispatch({ type: "register", payload: res.data });
    }
    return res;
  } catch (e) {
    dispatch({ type: "error", payload: e.response.data.message });
  }
};

export const loginAction = async (dispatch, formData) => {
  try {
    dispatch({ type: "process" });
    const res = await api.post("/login", formData);
    if (!res.data.success) {
      console.log("false");
      throw new Error(res.data);
    } else {
      console.log("success");
      localStorage.setItem("auth", res.data.token);
      dispatch({ type: "login", payload: res.data.token });
    }
    return res;
  } catch (e) {
    console.log(e?.response?.data);
    dispatch({ type: "error", payload: e?.response?.data.message});
  }
};

export const logoutAction = async (dispatch) => {
  dispatch({ type: "logout" });
};

export const navigate = () => {
  dispatch({ type: "reset" });
};
