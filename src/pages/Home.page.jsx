import React from "react";
import PreventRoutes from "../components/PreventRoutes.component";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, Wrapper } from "@/components";

const HomePage = () => {
  const nav = useNavigate();
  return (
    <PreventRoutes path="/" isAuth={!localStorage.getItem("auth")}>
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <Wrapper>
          <div className=" mt-4">
            <Outlet />
          </div>
        </Wrapper>
      </div>
    </PreventRoutes>
  );
};

export default HomePage;
