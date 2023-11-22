// import coursesData from "../data/coursesData";
// import CourseCard from "../components/CourseCard";
import { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext";
import Footer from "../components/Footer";
import AllOrders from "../components/AllOrders";

export default function Orders({ cartHandleClick }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);

  const [orderedProductArray, setOrderedProductArray] = useState([]);

  // Fetch the ordered product array data
  useEffect(() => {
    // Replace this with your actual fetch logic
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://ec2-18-188-36-14.us-east-2.compute.amazonaws.com/b2/users/get-all-orders",
          {
            headers: {
              // store the token as Bearer token and store it in the localStorage {note all Authorization: `Bearer ${localStorage.getItem("token")}` is needed in headers specially if there is a verify when fetching and others } bearer token here is passe from login because you cannot access some of  the routes here if you are not logged in
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setOrderedProductArray(data);
      } catch (error) {
        console.error("Error fetching ordered products:", error);
      }
    };

    fetchData();
  }, []);

  return user.isAdmin === true ? (
    <>
      <div className="hero container-fluid ">
        <div className="container">
          <div className="row justify-content-center">
            <AllOrders orderedProductArray={orderedProductArray} />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  ) : (
    <></>
  );
}
