import React from "react";
import { useData } from "../Context/DataContext";
import LittleCartItem from "./LittleCartItem";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

export default function LittleCart() {
  const { backendCart, total, setTotal } = useData();

  return (
    <div className="little-cart-box">
      <div className="header">
        <h5>Items that on the cart</h5>
        {backendCart.length !== 0 &&
        Object.keys(backendCart[0]).length === 0 ? (
          <Box
            sx={{
              display: "flex",
              paddingLeft: "110px",
              paddingTop: "100px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <div className="hey">
            <div className="little-cart-items">
              {backendCart.map((item, i) => {
                return <LittleCartItem key={i} {...item} />;
              })}
            </div>
            <hr></hr>
            <div className="total-area">
              <div className="box">
                <b>Total </b>
                <p>${total}</p>
              </div>
              <div className="box">
                <b>Tax %8</b>
                <p>${(total * 8) / 100}</p>
              </div>
            </div>
            <hr></hr>
            <div className="big-total">
              <h4>Big Total </h4>
              <h3>${(total + (total * 8) / 100).toFixed(2)}</h3>
            </div>
            <hr></hr>
            <div className="little-cart-page-buttons">
              <button className="last-cart-button">
                <Link to="/cart">Give a order</Link>
              </button>
              <form action="/api/clear-carts" method="post">
                <button
                  className="last-cart-button clear"
                  onClick={() => (window.parent.location = document.referrer)}
                  type="submit"
                  name="clear"
                >
                  Clear All Carts
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
