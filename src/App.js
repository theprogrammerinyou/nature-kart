import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Products } from "./pages/products/Products";

const App = () => {
  return (
    <Routes>
      <Route path="/products" element={<Products />} />
    </Routes>
  );
};

export default App;
