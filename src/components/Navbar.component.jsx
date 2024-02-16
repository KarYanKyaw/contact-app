import React from "react";
import { Wrapper } from ".";
import ModalBox from "./ModalBox.component";
import { logoutAction } from "@/store/action/auth.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { data } = useSelector((store) => store.auth);
  const comfirmLogout = () => {
    logoutAction(dispatch);
    nav("/");
  };

  return (
    <div className="bg-neutral-200 ">
      <Wrapper>
        <div className="justify-between flex py-3 items-center">
          <p className=" font-serif text-2xl text-neutral-700">
            The Contact App
          </p>
          <div className=" flex gap-3">
            <Button variant="link" onClick={() => nav("/home")} className=" text-lg">Home</Button>
            <Button onClick={() => nav("/home/create")}>Create Contact</Button>
            <ModalBox
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
