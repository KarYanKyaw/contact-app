import { api } from "@/service/api";

export const createContact = async (dispatch, formData) => {
  try {
    dispatch({ type: "process", payload: formData });
    const res = await api.post("/contact", formData);
    console.log(res);
    dispatch({ type: "addNew", payload: res.data });
    return res;
  } catch (e) {
    dispatch({ type: "error", payload: e.response.data.message  });
  }
};

export const getAllContacts = async (dispatch) => {
  dispatch({ type: "process" });
  try {
    const res = await api.get("/contact");
    console.log(res);
    if (res.data) {
      const contactData = res.data.contacts.data;
      dispatch({ type: "getAll", payload: contactData });
      console.log(contactData);
      return contactData;
    }
  } catch (e) {
    return { error: true, msg: e.response.data.message };
  }
};

export const navigateHome = (dispatch) => {
  dispatch({ type: "reset" });
};
