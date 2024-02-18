import React, { useEffect, useState } from "react";
import { Error, FormInput, Header, Loading, Wrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { api } from "@/service/api";
import { creationIssue, processing } from "@/store/reducer/contact.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const CreateContactPage = () => {
  const { loading, creationError } = useSelector((store) => store.contact);

  //using tools
  const nav = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // preparing for editing
  const editMode = location.state?.edit;
  const id = location.state?.data?.id;

  // preparing for create
  const createMode = location.state?.create;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // deciding edit or create
  useEffect(() => {
    if (editMode) {
      const { name, email, phone, address } = location.state.data;
      setFormData({ name, phone, email: email || "", address: address || "" });
    } else if (createMode) {
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
      });
    }
  }, [location]);

  const handleFormDataChange = (e) =>
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    dispatch(processing());

    if (location.state?.edit) {
      // for edit
      try {
        res = await api.put(`/contact/${id}`, formData);
      } catch (e) {
        dispatch(creationIssue(e?.response?.data?.message));
      }
    } else {
      // for creating new
      try {
        res = await api.post("/contact", formData);
      } catch (e) {
        dispatch(creationIssue(e.response.data.message));
      }
    }
    if (res.status === 200) {
      nav("/home");
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
          {creationError && <Error error={creationError} />}
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
