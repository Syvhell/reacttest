import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import "./css/ProductCard.css";

export default function ProductCard({ productProp, cartHandleClick }) {
  const { _id, name, description, price, image } = productProp;
  const { user } = useContext(UserContext);

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 text-center p-4 bg-dark " key={_id}>
        <img src={image} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title text-white">{name}</h5>
          <p className="card-text text-white">{description}</p>
          <p className="text-white">₱{price}</p>
          <div className="my-3">
            <Link to={`/product/${_id}`}>
              <a href="#" className="buy-now-btn btn btn-primary align-bottom">
                Buy Now
              </a>
            </Link>
          </div>
          {user.id !== null ? (
            <>
              <div>
                <button
                  className="align-bottom bg-transparent"
                  onClick={() => cartHandleClick(productProp)}
                  size="sm"
                >
                  <i className="fa fa-cart-plus m-1"> </i>Cart
                  <i className="fa fa-plus m-1"></i>
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
