import React from "react";
import { useData } from "../Context/DataContext";
import TaxsAndCustomers from "../TaxsAndCustomers";

// checkh out the print-react npm there is a solution

export default function Taxs() {
  const { customers } = useData();
  console.log(customers);
  return (
    <div className="cart-page-container ">
      <h1 style={{ textAlign: "center", paddingBottom: "30px" }}>Taxs</h1>
      <div className="cart-page-box more-height">
        <div className="cart-page-titles">
          <h5>Customer Name</h5>
          <h5>Customer Phone</h5>
          <h5>Order Date</h5>
          <h5>Payment Style</h5>
          <h5>Total Amount</h5>
          <h5>Action</h5>
        </div>
        <div className="cart-page-cart-items">
          {typeof customers !== "undefined" &&
            customers.map((item, i) => {
              return <TaxsAndCustomers key={i} {...item} />;
            })}
        </div>
      </div>
    </div>
  );
}
