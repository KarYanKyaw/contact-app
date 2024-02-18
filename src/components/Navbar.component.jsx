import React, { useEffect, useState } from "react";
import { Wrapper } from ".";
import ModalBox from "./ModalBox.component";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { logout } from "@/store/reducer/auth.reducer";

const Navbar = () => {
  // route to navigate
  const dispatch = useDispatch();

  const nav = useNavigate();

  // logout
  const comfirmLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth");
    nav("/");
  };

  // set the route to navigate
  const navigateToCreatePage = () => {
    nav("/home/create", { state: { create: true } });
  };

  return (
    <div className="bg-neutral-200 ">
      <Wrapper>
        <div className="justify-between flex py-3 items-center">
          <p className=" font-serif cursor-pointer select-none text-2xl text-neutral-700">
            The Contact App
          </p>
          <div className=" flex gap-3">
            <Button
              variant="link"
              onClick={() => nav("/")}
              className=" text-lg"
            >
              Home
            </Button>
            <Button onClick={() => navigateToCreatePage()}>
              Create Contact
            </Button>
            <ModalBox
              variant="secondary"
              trigger={"Log Out"}
              title={"Are you sure you want to log out?"}
              description={"You can still close the site without logging out!"}
              confirm={"Yes! Log out"}
              fun={comfirmLogout}
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Navbar;
