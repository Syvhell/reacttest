import AdminView from "./AdminView";
import UserView from "./UserView";
import { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext";

export default function Products() {
  const [products, setProducts] = useState([]);
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

  return (
    <>
      {/*  <ProductSearch /> */}

      <div>
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-12 mb-5">
              <h1 className="display-6 fw-bolder text-center">
                Latest Products
              </h1>
              <hr />
            </div>
            <div className="row justify-content-center">
              {user.isAdmin === true ? (
                <AdminView productsData={products} fetchData={fetchData} />
              ) : (
                <UserView productsData={products} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
