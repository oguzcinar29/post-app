import React from "react";
import { useData } from "../Context/DataContext";
import ProductItem from "./ProductItem";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Products() {
  const { food, whichCategoryClicked } = useData();
  return (
    <div className="products-page">
      <div className="product-page-title">
        <h1>Products</h1>
      </div>
      <div className="products-title">
        <p>Product Name</p>
        <p>Product Image</p>
        <p>Product Price</p>
        <p>Product Type</p>
        <p>Action</p>
      </div>
      <div className="products-item">
        {food.length === 1 ? (
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
          food.map((item, i) => {
            if (item.type === whichCategoryClicked) {
              return <ProductItem key={i} {...item} />;
            }
          })
        )}
      </div>
    </div>
  );
}
