import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useData } from "../Context/DataContext";

// add some css to products page

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProductItem({ id, name, url, price, type }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [changeName, setChangeName] = useState(name);
  const [changeUrl, setChangeUrl] = useState(url);
  const [changePrice, setChangePrice] = useState(price);
  const [changeType, setChangeType] = useState(type);
  const { whichCategoryClicked } = useData();
  return (
    <div className="product-item">
      <p className="name">{name}</p>
      <img src={url} alt={`${name} image`} />
      <p className="price">${price}</p>
      <p className="type">{type}</p>
      <div className="edit-product-item">
        <button onClick={handleOpen}>Edit Item</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="product-add-box">
              <h4>Upgrade the item</h4>
              <form action="/api/edit-product" method="post">
                <input name="id" value={id} type="hidden" />
                <input
                  name="category"
                  value={whichCategoryClicked}
                  type="hidden"
                />
                <div className="product-input">
                  <p>Product Name: </p>
                  <input
                    type="text"
                    name="name"
                    placeholder="Type product name"
                    value={changeName}
                    onChange={(e) => setChangeName(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="product-input">
                  <p>Product Image: </p>
                  <input
                    type="text"
                    name="url"
                    value={changeUrl}
                    onChange={(e) => setChangeUrl(e.target.value)}
                    placeholder="Type product image's url"
                  />
                </div>
                <div className="product-input">
                  <p>Product Price: </p>
                  <input
                    type="text"
                    name="price"
                    value={changePrice}
                    onChange={(e) => setChangePrice(e.target.value)}
                    placeholder="Type product price"
                  />
                </div>
                <div className="product-input last-product">
                  <p>Product Type: </p>
                  <input
                    type="text"
                    name="type"
                    value={changeType}
                    onChange={(e) => setChangeType(e.target.value)}
                    placeholder="Type product type"
                  />
                </div>
                <input type="submit" value="Upgrade" className="move-right" />
              </form>
            </div>
          </Box>
        </Modal>
        <form action="/api/delete-product" method="post">
          <input type="hidden" name="category" value={whichCategoryClicked} />
          <button id="delete-product-item" type="submit" name="id" value={id}>
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
