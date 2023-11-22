import ProductCard from "./ProductCard";
import ProductSearch from "./SearchProduct";
import Banner from "./Banner";

import { useState, useEffect } from "react";

export default function UserView({ productsData, cartHandleClick }) {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const productsArr = productsData.map((product) => {
      //only render the active courses since the route used is /all from Course.js page
      if (product.isActive === true) {
        return (
          <ProductCard
            productProp={product}
            key={product._id}
            cartHandleClick={cartHandleClick}
          />
        );
      } else {
        return null;
      }
    });

    //set the courses state to the result of our map function, to bring our returned course component outside of the scope of our useEffect where our return statement below can see.
    setProducts(productsArr);
  }, [productsData]);

  return (
    <>
      <ProductSearch />
      <h1 className="py-3">Mophie Products</h1>
      {product}
    </>
  );
}
