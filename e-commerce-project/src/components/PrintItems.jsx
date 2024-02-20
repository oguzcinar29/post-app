import React from "react";

export default function PrintItems({ name, url, price, type, count }) {
  return (
    <>
      <div className="print-items-arr">
        <img src={url} alt={`${name} image`} />
        <b>{type}</b>
        <p>${price}</p>
        <p>{count}</p>
        <p>${price * count}</p>
      </div>
      <hr></hr>
    </>
  );
}
