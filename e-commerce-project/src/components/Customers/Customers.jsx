import React from "react";
import { useData } from "../Context/DataContext";
import TaxsAndCustomers from "../TaxsAndCustomers";
export default function Customers() {
  const { customers } = useData();
  return (
    <div className="cart-page-container ">
      <h1 style={{ textAlign: "center", paddingBottom: "30px" }}>Customers</h1>
      <div className="cart-page-box more-height">
        <div className="cart-page-titles">
          <h5>Customer Name</h5>
          <h5>Customer Phone</h5>
          <h5>Order Date</h5>
        </div>
        <div className="cart-page-cart-items">
          {typeof customers !== "undefined" &&
            customers.map((item, i) => {
              return <TaxsAndCustomers hey="false" key={i} {...item} />;
            })}
        </div>
      </div>
    </div>
  );
}
