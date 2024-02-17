import React, { useEffect, useState } from "react";
import { Wrapper } from ".";
import ModalBox from "./ModalBox.component";
import { logoutAction } from "@/store/action/auth.action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { navigateHome } from "@/store/action/contact.action";

const Navbar = () => {
  const [route, setRoute] = useState(null);
  const dispatch = useDispatch();

  const nav = useNavigate();

  const comfirmLogout = () => {
    logoutAction(dispatch);
    nav("/");
  };

  const handleClick = (type) => {
    setRoute(type);
    navigateHome(dispatch);
  };

  useEffect(() => {
    if (route === "home") {
      nav("/home");
    } else if (route === "create") {
      nav("/home/create");
    }
  }, [route]);

  return (
    <div className="bg-neutral-200 ">
      <Wrapper>
        <div className="justify-between flex py-3 items-center">
          <p className=" font-serif text-2xl text-neutral-700">
            The Contact App
          </p>
          <div className=" flex gap-3">
            <Button
              variant="link"
              onClick={() => handleClick("home")}
              className=" text-lg"
            >
              Home
            </Button>
            <Button onClick={() => handleClick("create")}>
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
