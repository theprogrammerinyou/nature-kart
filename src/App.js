import React from "react";
import { Routes, Route } from "react-router-dom";
import { Products } from "./pages/products/Products";
import { Login } from "./pages/Login/Login";
import { SignUp } from "./pages/Signup/Signup";

const App = () => {
  return (
    <Routes>
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
