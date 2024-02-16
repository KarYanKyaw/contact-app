import {
  Error,
  FormInput,
  Header,
  Loading,
  Navigator,
  Wrapper,
} from "@/components";
import PreventRoutes from "@/components/PreventRoutes.component";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/store/action/auth.action";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { loading, data, error } = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    loginAction(dispatch, formData);
  };

  useEffect(() => {
    if (data) {
      nav("/home");
    }
  }, [data]);

  return (
    <PreventRoutes path="/home" isAuth={localStorage.getItem("auth")}>
      <div className="bg-neutral-100">
        <Wrapper>
          <div className="flex text-center min-h-screen justify-center items-center ">
            {loading ? (
              <Loading />
            ) : (
              <div className=" flex flex-col gap-4">
                <Header
                  header={"Welcome From CA!"}
                  text={"Create an account for amazing contact management. "}
                />
                {error && <Error error={error} />}

                <form onSubmit={handleSubmit}>
                  <div className=" flex flex-col gap-5">
                    <FormInput
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email"
                      name="email"
                      label="email"
                      placeholder="Enter Your Email"
                    />
                    <FormInput
                      onChange={handleInputChange}
                      value={formData.password}
                      type={"password"}
                      name={"password"}
                      label={"password"}
                      placeholder="Enter Your Password"
                    />

                    <Button type="submit">Register</Button>

                    <Navigator
                      path={"register"}
                      label={"Already have an acoount?"}
                      type={"register"}
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
        </Wrapper>
      </div>
    </PreventRoutes>
  );
};

export default LoginPage;
