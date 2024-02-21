import React, { useEffect, useState } from "react";
import { useData } from "../Context/DataContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import BorderColorIcon from "@mui/icons-material/BorderColor";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function CategoriesHome() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const { setWhichCategory, loginId } = useData();
  const [whichCategorieClicked, setWhichCategorie] = useState("All");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const { categories, setCategories } = useData();

  const [editClicked, setEditClicked] = useState(false);
  const [tempText, setTempText] = useState("");
  const [tempId, setTempId] = useState();
  return (
    <div className="categories-box">
      <div className="categories-item">
        {categories.map((item, i) => {
          return (
            <div
              key={i}
              className="item"
              style={{
                backgroundColor:
                  whichCategorieClicked === item.type ? "#be185d" : "#15803d",
              }}
              onClick={() => {
                setWhichCategorie(item.type);
                setWhichCategory(item.type);
              }}
            >
              <h4 key={i}>{item.type}</h4>
            </div>
          );
        })}
      </div>
      <div className="add-cart">
        <Button onClick={handleOpen}>
          <AddIcon />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <h4 id="parent-modal-title">Add a category right here</h4>
            <form
              action="https://post-app-ab2l.onrender.com/api/add-categorie"
              method="post"
              className="add-form"
            >
              <input type="text" name="categorie" placeholder="Type here..." />

              <button type="submit">Insert</button>
            </form>
          </Box>
        </Modal>
      </div>
      <div className="add-cart edit-cart">
        <Button onClick={handleOpen2}>
          <BorderColorIcon />
        </Button>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <p id="parent-modal-title">Design your categories </p>
            <div className="edit-box">
              <div className="edit-title">
                <p>Category title</p>
                <p>Action</p>
              </div>
              <div className="edit-buttons">
                {categories.map((item, i) => {
                  return (
                    <div key={i} className="edit-item">
                      <div className="text-side">
                        {editClicked && item.id === tempId ? (
                          <input
                            type="text"
                            id="change-input"
                            value={item.id === tempId ? tempText : item.type}
                            onChange={(e) => setTempText(e.target.value)}
                          />
                        ) : (
                          <p>{item.type}</p>
                        )}
                      </div>
                      <div className="buttons-side">
                        <form
                          action="https://post-app-ab2l.onrender.com/api/edit-category"
                          method="post"
                          className="edit-form"
                        >
                          <input type="hidden" name="id" value={item.id} />
                          <button
                            type="button"
                            id="edit-btn"
                            onClick={() => {
                              setEditClicked(!editClicked);
                              setTempText(item.type);
                              setTempId(item.id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="submit"
                            value={editClicked ? tempText : item.type}
                            name="changedText"
                            id="save-btn"
                          >
                            Save
                          </button>
                        </form>
                        <form
                          action="https://post-app-ab2l.onrender.com/api/delete-categorie"
                          method="post"
                          className="delete-form"
                        >
                          <button
                            id="delete-btn"
                            type="submit"
                            value={item.id}
                            name="id"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
