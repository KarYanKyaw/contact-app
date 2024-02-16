import { api } from "./api";

export const getAllContacts = async () => {
  try {
    const res = await api.get("/contact");
    if (res.data) {
      const contactData = res.data.contacts.data;
      return contactData;
    }
  } catch (e) {
    return { error: true, msg: e.message };
  }
};
