import { ContactTable, Header, Loading } from "@/components";
import { getAllContacts } from "@/service/contact.service";
import React, { useEffect, useState } from "react";

const ViewContactPage = () => {
  const [items, setItems] = useState({
    loading: true,
    data: null,
    error: null,
  });
  useEffect(() => {
    (async () => {
      const res = await getAllContacts();
      if (res.error) {
        console.log("err");
      } else {
        setItems((prev) => ({ ...prev, loading: false, data: res }));
      }
    })();
  }, []);

  return (
    <div className=" flex items-center py-6 gap-3 flex-col">
      <>
        {items.loading ? (
          <Loading />
        ) : (
          <>
            <div className="mb-3">
              <Header header={"Your Contact List"} />
            </div>
            <ContactTable data={items.data} />
          </>
        )}
      </>
    </div>
  );
};

export default ViewContactPage;
