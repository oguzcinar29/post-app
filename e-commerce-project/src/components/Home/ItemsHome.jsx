import React, { useState } from "react";
import { useData } from "../Context/DataContext";
import SingleItem from "./SingleItem";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from "react-router-dom";
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
var binaryData = [];

export default function ItemsHome() {
  const { food, whichCategoryClicked, setWhichCategory } = useData();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { searchText } = useData();
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div className="items-box-big">
      {food.length !== 0 && Object.keys(food[0]).length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "250px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className="items-box">
          {food.map((item, i) => {
            if (whichCategoryClicked === item.type) {
              if (searchText === "") {
                return <SingleItem key={item.id} {...item} />;
              } else {
                if (item.name.toLowerCase().includes(searchText)) {
                  return <SingleItem key={item.id} {...item} />;
                }
              }
            } else if (whichCategoryClicked === "All") {
              return <SingleItem key={item.id} {...item} />;
            }
          })}
          <div className="product-add-cart">
            <Button onClick={handleOpen}>
              <AddIcon />
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="product-add-box">
                  <h4>Add new product</h4>
                  <form
                    action="https://post-app-ab2l.onrender.com/api/add-product"
                    method="post"
                  >
                    <div className="product-input">
                      <p>Product Name: </p>
                      <input
                        type="text"
                        name="name"
                        placeholder="Type product name"
                        autoFocus
                      />
                    </div>
                    <div className="product-input e3">
                      <p>Product Image: </p>
                      <input
                        type="text"
                        name="url"
                        placeholder="Type product image's url"
                      />
                    </div>
                    <div className="product-input">
                      <p>Product Price: </p>
                      <input
                        type="text"
                        name="price"
                        placeholder="Type product price"
                      />
                    </div>
                    <div className="product-input last-product">
                      <p>Product Type: </p>
                      <input
                        type="text"
                        name="type"
                        placeholder="Type product type"
                      />
                    </div>
                    <input type="submit" value="Build" className="move-right" />
                  </form>
                </div>
              </Box>
            </Modal>
          </div>
          <Link
            to={`/products/${whichCategoryClicked}`}
            className="product-add-cart product-edit-cart"
          >
            <button>
              <BorderColorIcon />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
