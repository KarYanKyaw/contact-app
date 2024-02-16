import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  CreateContactPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ViewContactPage,
} from "../src/pages/";
import TestPage from "./pages/TestPage";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/home" element={<HomePage />}>
        <Route path="create" element={<CreateContactPage />} />
        <Route index element={<ViewContactPage />} />
      </Route>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
