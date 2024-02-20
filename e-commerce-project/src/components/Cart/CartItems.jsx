import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

export default function CartItems({ id, url, name, type, price, count }) {
  return (
    <div className="cart-page-item">
      <img src={url} alt={`${name} image`} />
      <p style={{ width: "150px", paddingLeft: "40px" }} className="name">
        {name}
      </p>
      <p style={{ width: "150px", paddingLeft: "50px" }} className="type">
        {type}
      </p>
      <p style={{ width: "150px", paddingLeft: "50px" }} className="price">
        ${price}
      </p>
      <div className="buttons">
        <form action="/api/edit-little-cart" method="post">
          <button type="submit" name="button" value="decrease">
            <RemoveCircleOutlineOutlinedIcon />
          </button>
          <b style={{ width: "150px" }}>{count}</b>

          <button type="submit" name="button" value="increase">
            <AddCircleOutlineIcon />
          </button>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="count" value={count} />
          <input type="hidden" name="page" value="/cart" />
        </form>
      </div>
      <p style={{ width: "150px", textAlign: "center" }} className="total">
        ${price * count}
      </p>
      <form action="/api/delete-cart" method="post">
        <input id="delete-btn" type="submit" value="delete" />
        <input type="hidden" name="id" value={id} />
      </form>
    </div>
  );
}
