import React from "react";
import { Link } from "react-router-dom";
import "./css/HomeProductCard.css";

export default function ProductCard(productProp) {
  const { data } = productProp;
  const { _id, name, description, price, image } = data;

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 text-center p-4 bg-dark " key={_id}>
        <img src={image} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title text-white">{name}</h5>
          <p className="card-text text-white">{description}</p>
          <p className="text-white">₱{price}</p>

          <Link to={`/product/${_id}`}>
            <a href="#" className="buy-now-btn btn btn-primary align-bottom">
              buy now
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
