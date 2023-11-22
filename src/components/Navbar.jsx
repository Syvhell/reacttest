import React from "react";
import "./css/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";
export default function Navbar({ size }) {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div>
      <nav className="navbar navbar-expand-lg  py-3 shadow-sm  ">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="#">
            <i className="fa fa-mobile m-1"></i>moPhie
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {user.isAdmin === true ? (
                <></>
              ) : (
                <>
                  <Link className="nav-item" as={NavLink} to="/">
                    <a
                      className="nav-link custom-link"
                      aria-current="page"
                      href="#"
                    >
                      HOME
                    </a>
                  </Link>

                  <Link className="nav-item" as={NavLink} to="/products">
                    <a className="nav-link custom-link" href="#">
                      PRODUCTS
                    </a>
                  </Link>

                  <Link className="nav-item" as={NavLink} to="/about">
                    <a className="nav-link custom-link" href="#">
                      ABOUT
                    </a>
                  </Link>
                </>
              )}
            </ul>
            <div className="buttons">
              {user.isAdmin === true ? (
                <>
                  <Link
                    className="btn btn-outline-dark ms-2"
                    as={NavLink}
                    to="/products"
                    exact
                  >
                    <i className="fa fa-mobile m-1"> </i>Products
                  </Link>
                  <Link
                    className="btn btn-outline-dark ms-2"
                    as={NavLink}
                    to="/addproduct"
                    exact
                  >
                    <i className="fa fa-plus m-1"> </i>Add Products
                  </Link>
                  <Link
                    className="btn btn-outline-dark ms-2"
                    as={NavLink}
                    to="/profile"
                    exact
                  >
                    <i className="fa fa-user m-1 "> </i>Profile
                  </Link>
                  <Link
                    className="btn btn-outline-dark ms-2"
                    as={NavLink}
                    to="/logout"
                    exact
                  >
                    <i className="fa fa-sign-out m-1"> </i>Logout
                  </Link>
                </>
              ) : (
                <></>
              )}
              {user.isAdmin === false && user.id !== null ? (
                <>
                  <Link className="btn btn-outline-dark ms-2 ">
                    <i className="fa fa-shopping-cart m-1"> </i>Cart({size})
                  </Link>
                  <Link
                    className="btn btn-outline-dark ms-2"
                    as={NavLink}
                    to="/profile"
                    exact
                  >
                    <i className="fa fa-user m-1"> </i>Profile
                  </Link>

                  <Link
                    className="btn btn-outline-dark ms-2"
                    as={NavLink}
                    to="/logout"
                    exact
                  >
                    <i className="fa fa-sign-out m-1"> </i>Logout
                  </Link>
                </>
              ) : (
                <></>
              )}
              {user.id === null ? (
                <>
                  <Link
                    className="btn btn-outline-dark"
                    as={NavLink}
                    to="/login"
                    exact
                  >
                    <i className="fa fa-sign-in m-1"> </i>Login
                  </Link>
                  <Link
                    className="btn btn-outline-dark ms-2"
                    as={NavLink}
                    to="/register"
                    exact
                  >
                    <i className="fa fa-user-plus m-1"> </i>Register
                  </Link>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
