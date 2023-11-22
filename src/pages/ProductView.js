import { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import UserContext from "../UserContext";
import "./ProductView.css";
import Swal from "sweetalert2";

export default function CourseView() {
  const { user } = useContext(UserContext);

  // It allows us to gain access methods that will allow us to redirect a user to a different page after enrolling in a course
  // an object with methods to redirect the user
  const navigate = useNavigate();

  // The "useParams" hook allows us to retrieve the courseId passed via the URL
  const { productId } = useParams();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const enroll = (productId, quantity, id) => {
    fetch(
      `http://ec2-18-188-36-14.us-east-2.compute.amazonaws.com/b2/users/checkout`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          quantity: quantity,
          productId: productId,
          id: id,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message === "Order created successfully") {
          Swal.fire({
            title: "Successfully Ordered",
            icon: "success",
            text: "You have successfully ordered this product.",
          });

          navigate("/products");
        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please try again.",
          });
        }
      });
  };

  useEffect(() => {
    console.log(productId);

    fetch(
      `http://ec2-18-188-36-14.us-east-2.compute.amazonaws.com/b2/products/${productId}/single-product`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setImage(data.image);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
      });
  }, [productId]);

  function incrementQuantity() {
    if (quantity < 30) {
      setQuantity(quantity + 1);
    } else {
      alert("Reached maximum product quantity order");
    }
  }

  function decrementQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <>
      <div className="hero container-fluid vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-3 mb-4">
              <div className="card h-100 text-center p-4 bg-dark ">
                <img src={image} className="card-img-top" alt={name} />
                <div className="card-body">
                  <Card.Title className="text-white">{name}</Card.Title>
                  <Card.Subtitle className="text-white">
                    Description:
                  </Card.Subtitle>
                  <Card.Text className="text-white">{description}</Card.Text>
                  <Card.Subtitle className="text-white">Price:</Card.Subtitle>
                  <p className="text-white">PhP {price}</p>
                  <div className="d-flex justify-content-center pb-2">
                    <Button variant="secondary" onClick={decrementQuantity}>
                      -
                    </Button>
                    <div className="mx-3">{quantity}</div>
                    <Button variant="secondary" onClick={incrementQuantity}>
                      +
                    </Button>
                  </div>
                  {user.id !== null ? (
                    <>
                      <Button
                        variant="primary"
                        block
                        onClick={() => enroll(productId, quantity, user.id)}
                      >
                        Checkout
                      </Button>
                    </>
                  ) : (
                    <Link className="btn btn-warning btn-block" to="/login">
                      Log in to Order Now
                    </Link>
                  )}
                  <div className="mt-3">
                    <Link className="btn btn-danger" to="/products">
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
