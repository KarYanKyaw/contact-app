import { ContactTable, Error, Header, Loading } from "@/components";
import { getAllContacts } from "@/store/action/contact.action";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ViewContactPage = () => {
  const { loading, data, error } = useSelector((store) => store.contact);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    (async () => {
      const res = await getAllContacts(dispatch);
    })();
  }, []);

  return (
    <div className=" flex items-center py-6 gap-3 flex-col">
      <>
        {loading ? (
          <>
            <Loading />
            {loading}
          </>
        ) : (
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
                    <ContactTable data={data} />
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
