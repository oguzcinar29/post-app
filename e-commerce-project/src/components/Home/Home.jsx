import React from "react";
import CategoriesHome from "./CategoriesHome";
import ItemsHome from "./ItemsHome";
import LittleCart from "./LittleCart";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-box">
        <div className="categories">
          <CategoriesHome />
        </div>
        <div className="items">
          <ItemsHome />
        </div>
        <div className="cart">
          <LittleCart />
        </div>
      </div>
    </div>
  );
}
