import React, { useEffect, useState } from "react";
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
import { issue, login, processing } from "@/store/reducer/auth.reducer";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "@/service/api";

const LoginPage = () => {
  const { loading, data, error } = useSelector((state) => state.auth);

  const nav = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();
  const { success, message, email, password } = state || {};

  useEffect(() => {
    if (success) {
      setFormData({ email, password });
    }
  }, [success, email, password]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(processing());
    const res = await api.post("/login", formData);
    if (!res.data.success) {
      dispatch(issue(res.data.message));
    } else {
      dispatch(login(res.data));
      localStorage.setItem("auth", res.data.token);
    }
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
                {success ? (
                  <Header
                    header={message}
                    text={"Please login to continue!"}
                    style={"!text-green-500"}
                  />
                ) : (
                  <Header
                    header={"Welcome Back From CA!"}
                    text={"Login an account for amazing contact management."}
                  />
                )}
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
                      required
                      placeholder="Enter Your Password"
                    />

                    <Button type="submit">Login</Button>

                    <Navigator
                      path={"register"}
                      label={"Already have an account?"}
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
