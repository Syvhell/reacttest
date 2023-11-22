// import coursesData from "../data/coursesData";
// import CourseCard from "../components/CourseCard";
import { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import Footer from "../components/Footer";
import "./Products.css";

export default function Courses({ cartHandleClick }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);

  const fetchData = () => {
    fetch(
      `http://ec2-18-188-36-14.us-east-2.compute.amazonaws.com/b2/products/all-product-admin`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return user.isAdmin === true ? (
    <>
      <div className="hero container-fluid ">
        <div className="container">
          <div className="row justify-content-center">
            <AdminView productsData={products} fetchData={fetchData} />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  ) : (
    <>
      <div className="hero container-fluid ">
        <div className="container">
          <div className="row justify-content-center">
            <UserView
              productsData={products}
              cartHandleClick={cartHandleClick}
            />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
