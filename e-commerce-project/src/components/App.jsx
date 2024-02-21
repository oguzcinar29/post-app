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
        <Route path="/https://post-app-ab2l.onrender.com" element={<Home />} />
        <Route
          path="/https://post-app-ab2l.onrender.com/cart"
          element={<Cart />}
        />
        <Route
          path="/https://post-app-ab2l.onrender.com/products/:id"
          element={<Products />}
        />
        <Route
          path="/https://post-app-ab2l.onrender.com/taxs"
          element={<Taxs />}
        />
        <Route
          path="/https://post-app-ab2l.onrender.com/customers"
          element={<Customers />}
        />
        <Route
          path="/https://post-app-ab2l.onrender.com/login"
          element={<Login />}
        />
        <Route
          path="/https://post-app-ab2l.onrender.com/register"
          element={<Register />}
        />
        <Route
          path="/https://post-app-ab2l.onrender.com/statistics"
          element={<Statistics />}
        />
      </Routes>
    </div>
  );
}
