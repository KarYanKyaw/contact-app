import { api } from "@/service/api";

export const createContact = async (dispatch, formData) => {
  try {
    dispatch({ type: "process", payload: formData });
    const res = await api.post("/contact", formData);
    dispatch({ type: "addNew", payload: res.data });
    return res;
  } catch (e) {
    console.log(e);
    dispatch({ type: "error", payload: e.response.data.message });
  }
};

export const getAllContacts = async (dispatch) => {
  try {
    dispatch({ type: "process" });
    const res = await api.get("/contact");
    if (res.data) {
      const contactData = res.data.contacts.data;
      dispatch({ type: "getAll", payload: contactData });
      return contactData;
    }
  } catch (e) {
    return { error: true, msg: e.response.data.message };
  }
};

export const editContact = async (dispatch, id, formData) => {
  try {
    dispatch({ type: "process" });
    const res = await api.put(`/contact/${id}`, formData);
    dispatch({ type: "edit", payload: res });
    dispatch({ type: "process" });
    const response = await api.get("/contact");
    if (response.data) {
      const contactData = response.data.contacts.data;
      dispatch({ type: "getAll", payload: contactData });
    }
    return res;
  } catch (e) {
    dispatch({ type: "error", payload: e.response.data.message });
  }
};

export const deleteContact = async (dispatch, id) => {
  try {
    dispatch({ type: "process" });
    const res = await api.delete(`/contact/${id}`);
    dispatch({ type: "delete", payload: res });
    dispatch({ type: "process" });
    if (res) {
      const response = await api.get("/contact");
      if (response.data) {
        const contactData = response.data.contacts.data;
        dispatch({ type: "getAll", payload: contactData });
      }
    }
    return res;
  } catch (e) {
    console.log(e);
    return { error: true, message: e };
  }
};

export const navigateHome = (dispatch) => {
  dispatch({ type: "reset" });
};
