import { ContactTable, Error, Header, Loading } from "@/components";
import { api } from "@/service/api";
import { getAll, processing } from "@/store/reducer/contact.reducer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ViewContactPage = () => {
  const { loading, data, error } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        dispatch(processing());
        const res = await api.get("/contact");
        if (res.data) {
          const contactData = res.data.contacts.data;
          dispatch(getAll(contactData));
          return contactData;
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="py-6 gap-3 flex-col">
          {error ? (
            <Error error={"line ma kg"} />
          ) : (
            <>
              {data === null ? (
                <Loading />
              ) : (
                <div className="mb-3">
                  <Header header={"Your Contact List"} />
                  <ContactTable data={data} />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ViewContactPage;
