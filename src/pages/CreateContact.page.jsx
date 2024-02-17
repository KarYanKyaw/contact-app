import { Error, FormInput, Header, Loading, Wrapper } from "@/components";
import { Button } from "@/components/ui/button";
import {
  createContact,
  editContact,
  navigateHome,
} from "@/store/action/contact.action";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const CreateContactPage = () => {
  const { loading, error } = useSelector((store) => store.contact);

  const nav = useNavigate();
  const location = useLocation();
  const editMode = location.state?.edit;

  useEffect(() => {
    if (editMode) {
      const { name, email, phone, address } = location.state.data;
      setFormData({ name, email: email || "", phone, address: address || "" });
    }
  }, [location]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const dispatch = useDispatch();

  const handleFormDataChange = (e) =>
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (location.state?.edit) {
      res = await editContact(dispatch, location.state.data.id, formData);
    } else {
      res = await createContact(dispatch, formData);
    }
    if (res?.status === 200) {
      nav("/home");
      navigateHome(dispatch);
    }
  };
  return (
    <Wrapper>
      <div className="mb-12 text-center">
        <Header header={"Create a contact"} />
      </div>
      {loading ? (
        <div className="flex py-48 justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {error && <Error error={error} />}
          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <FormInput
              onChange={handleFormDataChange}
              value={formData.name}
              label={"Name"}
              type="text"
              name="name"
            />
            <FormInput
              onChange={handleFormDataChange}
              value={formData.phone}
              label={"Phone"}
              type="text"
              name="phone"
            />
            <FormInput
              onChange={handleFormDataChange}
              value={formData.email}
              label={"Email"}
              type="text"
              name="email"
            />
            <FormInput
              onChange={handleFormDataChange}
              value={formData.address}
              label={"Address"}
              type="text"
              name="address"
            />
            <Button className=" w-full block" type="submit">
              {editMode ? "Edit" : "Create"} Contact Now
            </Button>
          </form>
        </>
      )}
    </Wrapper>
  );
};

export default CreateContactPage;
