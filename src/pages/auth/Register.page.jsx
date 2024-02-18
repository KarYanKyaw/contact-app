import {
  FormInput,
  Header,
  Loading,
  Navigator,
  Wrapper,
  Error,
} from "@/components";
import PreventRoutes from "@/components/PreventRoutes.component";
import { Button } from "@/components/ui/button";
import { api } from "@/service/api";
import { issue, processing, reset } from "@/store/reducer/auth.reducer";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const { loading, error } = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(processing());
    try {
      const res = await api.post("/register", formData);
      console.log(res.data)
      if (res.data) {
        nav("/", {
          state: {
            success: res.data.success,
            message: res.data.message,
            email: formData.email,
            password: formData.password,
          },
        });
        dispatch(reset());
      }
      return res;
    } catch (e) {
      dispatch(issue(e.response.data.message));
    }
  };

  return (
    <PreventRoutes path="/home" isAuth={localStorage.getItem("auth")}>
      <div className=" bg-neutral-100">
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
                {error && (
                  <Error error={"Registration Failed!"} message={error} />
                )}

                <form onSubmit={handleSubmit}>
                  <div className=" flex flex-col gap-5">
                    <FormInput
                      onChange={handleInputChange}
                      value={formData.name}
                      type={"text"}
                      name={"name"}
                      label={"your name"}
                      placeholder={"Enter Your Name"}
                    />
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
                    <FormInput
                      onChange={handleInputChange}
                      value={formData.password_confirmation}
                      type={"password"}
                      name={"password_confirmation"}
                      label="Confirm Password"
                      placeholder="Confirm Your Password"
                    />

                    <Button type="submit">Register</Button>

                    <Navigator
                      path={""}
                      label={"Already have an acoount?"}
                      type={"login"}
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

export default RegisterPage;
