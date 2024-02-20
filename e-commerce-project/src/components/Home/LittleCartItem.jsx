import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

export default function LittleCartItem({ id, url, name, price, count, type }) {
  return (
    <div className="little-cart-item">
      <div className="left-side">
        <img src={url} alt={`${name} image`} />
        <div className="info">
          <b>{name}</b>
          <p>
            ${price}
            <span>x</span>
            {count}
          </p>
        </div>
      </div>
      <div className="buttons">
        <form action="/api/edit-little-cart" method="post">
          <button type="submit" name="button" value="decrease">
            <RemoveCircleOutlineOutlinedIcon />
          </button>
          <b>{count}</b>
          <button type="submit" name="button" value="increase">
            <AddCircleOutlineIcon />
          </button>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="count" value={count} />
          <input type="hidden" name="page" value="/" />
        </form>
      </div>
    </div>
  );
}
