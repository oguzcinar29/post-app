import React from "react";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Cart from "./Cart/Cart";
import Products from "./ProductInfo/Products";
import Taxs from "./Taxs/Taxs";
import Customers from "./Customers/Customers";
import Statistics from "./Statistics/Statistics";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { useData } from "./Context/DataContext";

export default function App() {
  const { isExitClicked, isItLogin } = useData();
  console.log(isExitClicked);
  return (
    <div className="main-container">
      {isExitClicked ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/taxs" element={<Taxs />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </div>
  );
}
