import { ContactTable, Error, Header, Loading } from "@/components";
import { getAllContacts } from "@/store/action/contact.action";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ViewContactPage = () => {
  const { loading, data, error } = useSelector((store) => store.contact);
  const dispatch = useDispatch();
  console.log(error);
  useEffect(() => {
    (async () => {
      const res = await getAllContacts(dispatch);
      localStorage.setItem("data", JSON.stringify(data));
    })();
  },[]);

  return (
    <div className=" flex items-center py-6 gap-3 flex-col">
      <>
        {loading ? (
          <>
            <Loading />
            {loading}
          </>
        ) : (
          // <h1>not loading {"data"}</h1>
          <>
            {error ? (
              <Error error={"line ma kg"} />
            ) : (
              <>
                {data === null ? (
                  <Loading />
                ) : (
                  <div className="mb-3">
                    <Header header={"Your Contact List"} />

                    <ContactTable
                      data={
                        data || JSON.parse(localStorage.getItem("data")) || null
                      }
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default ViewContactPage;
