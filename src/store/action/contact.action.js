import { api } from "@/service/api";

export const createContact = async (dispatch, formData) => {
  try {
    dispatch({ type: "process", payload: formData });
    const res = await api.post("/contact", formData);
    dispatch({ type: "create", payload: res.data });
    return res;
  } catch (e) {
    console.log(e);
    dispatch({ type: "error", payload: "error" });
  }
};
