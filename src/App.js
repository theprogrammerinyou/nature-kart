import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import React from "react";
import { SignUp } from "./pages/Signup/Signup";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
