import HomeProductCard from "./HomeProductCard";

import { useState, useEffect } from "react";

export default function UserView() {
  const [previews, setPreviews] = useState();

  useEffect(() => {
    fetch(
      `http://ec2-18-188-36-14.us-east-2.compute.amazonaws.com/b2/products/all-product`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //   the first array used to store random numbers
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
        //   array is used to store featured course data
        const featured = [];

        for (let i = 0; i < 8; i++) {
          featured.push(
            <HomeProductCard
              data={data[numbers[i]]}
              key={data[numbers[i]._id]}
            />
          );
        }
        setPreviews(featured);
      });
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
            <div className="row justify-content-center">{previews}</div>
          </div>
        </div>
      </div>
    </>
  );
}
