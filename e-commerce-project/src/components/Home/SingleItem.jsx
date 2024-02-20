import React, { useState } from "react";
import { useData } from "../Context/DataContext";

//add carts to little cart area

export default function SingleItem({ id, name, url, price, type }) {
  const { handleClick } = useData();

  return (
    <>
      <form action="/api/add-to-cart" method="post">
        <button
          type="submit"
          onClick={() => {
            handleClick(id, name, url, price);
          }}
          className="item"
        >
          <img src={url} alt={name + "image"} />
          <div className="item-info">
            <b>{name}</b>
            <p>${price}</p>
          </div>
        </button>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="name" value={name} />
        <input type="hidden" name="url" value={url} />
        <input type="hidden" name="price" value={price} />
        <input type="hidden" name="type" value={type} />
      </form>
    </>
  );
}
