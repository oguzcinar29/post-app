import React, { useState } from "react";
import { useData } from "../Context/DataContext";
import CartItems from "./CartItems";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Select from "react-select";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1; // months from 1-12
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();

const newDate = year + "/" + month + "/" + day;

console.log(newDate);
export default function Cart() {
  const { backendCart, total } = useData();
  const options = [
    { value: "Visa", label: "Visa" },
    { value: "Cash", label: "Cash" },
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="cart-page-container">
      <div className="cart-page-box">
        <div className="cart-page-titles">
          <h5>Product Image</h5>
          <h5>Product Name</h5>
          <h5>Product Category</h5>
          <h5>Product Price</h5>
          <h5>Product Count</h5>
          <h5>Product Total</h5>
          <h5>Action</h5>
        </div>
        <div className="cart-page-cart-items">
          {backendCart.map((item, i) => {
            return <CartItems key={i} {...item} />;
          })}
        </div>
      </div>
      <div className="move-right2">
        <div className="cart-page-total">
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
            <div>
              <Button
                className="last-cart-button"
                style={{ color: "white", backgroundColor: "blue" }}
                onClick={handleOpen}
              >
                Give a order
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <form
                    action="/api/get-customer-info"
                    method="post"
                    className="tired-form"
                  >
                    <h5>Customer Informations</h5>
                    <div className="customer-order">
                      <label>Customer Name</label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Type custome name..."
                        autoFocus
                        required
                      />
                    </div>
                    <div className="customer-order">
                      <label>Customer Phone</label>
                      <input
                        type="text"
                        required
                        name="phone"
                        placeholder="Type phone number..."
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                      />
                    </div>
                    <div className="customer-order">
                      <label>Choise your payment way</label>
                      <Select required name="choice" options={options} />
                    </div>
                    <input
                      type="hidden"
                      name="date"
                      value={new Date().toISOString().split("T")[0]}
                    />
                    <input
                      type="hidden"
                      name="total"
                      value={(total + (total * 8) / 100).toFixed(2)}
                    />
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
                    <input id="tired-input" type="submit" value="Ok" />
                  </form>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
