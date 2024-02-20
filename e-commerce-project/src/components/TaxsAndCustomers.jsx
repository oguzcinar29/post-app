import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PrintableComponent from "./PrintableComponent";
// chechk out the react-print

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: "24px", // Adding quotes for boxShadow value
  padding: "16px", // Adding padding
  maxHeight: "600px", // Set the maximum height for scrolling
  overflowY: "auto", // Enable vertical scrolling
};

export default function TaxsAndCustomers({
  name,
  phone,
  payment,
  order_date,
  total,
  hey,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <hr></hr>
      <div className="cart-page-item">
        <p>{name}</p>
        <p>{phone}</p>
        <p>{order_date}</p>
        {hey !== "false" && <p>{payment}</p>}
        {hey !== "false" && <p>{total}</p>}
        {hey !== "false" && (
          <div>
            <Button onClick={handleOpen}>Print</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <PrintableComponent />
                <button onClick={handlePrint}>print</button>
              </Box>
            </Modal>
          </div>
        )}
      </div>
    </>
  );
}
