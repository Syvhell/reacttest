import "./App.css";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductVieW from "./pages/ProductView";
import AddProduct from "./pages/AddProducts";
import AllOrders from "./pages/Orders";
import About from "./pages/About";

import Swal from "sweetalert2";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";
import React, { useState, useEffect } from "react";

// globaly
function App() {
  // for getting token this is for global this is helped whit the UserContext.js
  const [user, setUser] = useState({
    // this is just set to null
    id: null,
    isAdmin: null,
  });
  // for clearing token of logout
  const unsetUser = () => {
    localStorage.clear();
  };
  // this is where you generate the details of the user to be put in the global
  useEffect(() => {
    console.log(user);
    // fetch data from db
    fetch(
      "http://ec2-18-188-36-14.us-east-2.compute.amazonaws.com/b2/users/user-details",
      {
        headers: {
          // store the token as Bearer token and store it in the localStorage {note all Authorization: `Bearer ${localStorage.getItem("token")}` is needed in headers specially if there is a verify when fetching and others } bearer token here is passe from login because you cannot access some of  the routes here if you are not logged in
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // if there is data passed go to if and if there is non else
        if (typeof data._id !== "undefined") {
          // the passed id will be set in the setUser and will be set globally carried in line 21 const [user, setUser] = useState and so on
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      });
    console.log(localStorage);
  }, []);

  const [cart, setCart] = useState([]);
  const [show, setShow] = useState(true);

  const cartHandleClick = (item) => {
    // Check if the item is already in the cart

    const isPresent = cart.some((product) => product._id === item._id);

    // If the item is not present, add it to the cart
    if (!isPresent) {
      setCart((prevCart) => [...prevCart, item]);
    } else {
      return;
    }
  };

  useEffect(() => {
    // Call cartHandleClick when needed
    const itemToAdd = { _id: "someId" /* other properties */ };
    cartHandleClick(itemToAdd);
  }, [cartHandleClick]);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Navbar size={cart.length} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/products"
            element={<Products cartHandleClick={cartHandleClick} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<AllOrders />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/product/:productId" element={<ProductVieW />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
