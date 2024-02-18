import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ModalBox from "./ModalBox.component";
import { Button } from "./ui/button";
import {
  clearError,
  getAll,
  issue,
  processing,
} from "@/store/reducer/contact.reducer";
import { api } from "@/service/api";

const ActionTrigger = ({ data }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = () => {
    nav("/home/create", { state: { edit: true, data: data } });
    // clear contact creation page error if it's existed
    dispatch(clearError());
  };

  const handleDelete = async (id) => {
    try {
      dispatch(processing());
      const res = await api.delete(`/contact/${id}`);
      // refetching the updated data to update ui
      try {
        const res = await api.get("/contact");
        if (res.data) {
          const contactData = res.data.contacts.data;
          dispatch(getAll(contactData));
          return contactData;
        }
      } catch (e) {
        dispatch(issue("Fetching error"));
      }
      return res;
    } catch (e) {
      console.log(e);
      return { error: true, message: e };
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <ModalBox
            variant="ghost"
            confirm={"Yes, Delete This!"}
            fun={() => handleDelete(data.id)}
            trigger={"Delete"}
            title={"Are you sure to delete this contact?"}
            description={"This Action can't be undone"}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEdit()}>
          <Button variant={"ghost"}>Edit</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionTrigger;
