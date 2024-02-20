import React from "react";
import { useData } from "../Context/DataContext";

export default function Statistics() {
  const { userName, food, customers } = useData();
  const totalItem = food.length;
  function getSalary() {
    let total = 0;
    typeof customers !== "undefined" &&
      customers.map((item) => (total += item.total));
    return total;
  }
  const totalSalary = getSalary();
  console.log(userName);
  return (
    <div className="stat-container">
      <div className="stat-box">
        <h1>My Statistics</h1>
        <h4>
          Welcome <span>{userName}</span>
        </h4>
        <div className="stat-boxs">
          <div className="box">
            <img src="https://my-pos-application.onrender.com/images/user.png" />
            <div className="box-text">
              <p>Total Customers</p>
              <p>{typeof customers !== "undefined" && customers.length}</p>
            </div>
          </div>
          <div className="box">
            <img src="https://my-pos-application.onrender.com/images/money.png" />
            <div className="box-text">
              <p>Total Salary</p>
              <p>${totalSalary}</p>
            </div>
          </div>
          <div className="box">
            <img src="https://my-pos-application.onrender.com/images/sale.png" />
            <div className="box-text">
              <p>Total Order</p>
              <p>{typeof customers !== "undefined" && customers.length}</p>
            </div>
          </div>
          <div className="box">
            <img src="https://my-pos-application.onrender.com/images/product.png" />
            <div className="box-text">
              <p>Total Product</p>
              <p>{totalItem}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
