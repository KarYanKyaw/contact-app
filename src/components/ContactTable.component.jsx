import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActionTrigger } from ".";

const ContactTable = ({ data }) => {
  return (
    <>
      {data == null ? (
        "empty"
      ) : (
        <Table>
          <TableCaption>End of your contact lists</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] ">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((el) => (
              <TableRow key={el.id}>
                <TableCell className="font-medium num">{""}</TableCell>
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.phone}</TableCell>
                <TableCell>{el?.email}</TableCell>
                <TableCell>{el?.address}</TableCell>
                <TableCell>
                  <ActionTrigger />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default ContactTable;
