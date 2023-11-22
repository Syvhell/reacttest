import { useState, useEffect } from "react";
import { CardGroup } from "react-bootstrap";
import PreviewProducts from "./PreviewProducts";

export default function FeaturedCourses() {
  const [previews, setPreviews] = useState();

  useEffect(() => {
    fetch(
      `http://ec2-18-188-36-14.us-east-2.compute.amazonaws.com/b2/products/all-product`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //   the first array used to store random numbers
        const numbers = [];
        //   array is used to store featured course data
        const featured = [];

        const generateRandomNums = () => {
          let randomNum = Math.floor(Math.random() * data.length);
          if (numbers.indexOf(randomNum) === -1) {
            numbers.push(randomNum);
          } else {
            generateRandomNums();
          }
        };
        for (let i = 0; i < 5; i++) {
          generateRandomNums();
          featured.push(
            <PreviewProducts
              data={data[numbers[i]]}
              key={data[numbers[i]._id]}
              breakPoint={2}
            />
          );
        }
        setPreviews(featured);
      });
  }, []);
  return (
    <>
      <div className="hero container pt-5 ">
        <h1 className="display-6 fw-bolder text-center">Featured Products</h1>
        <hr></hr>
        <CardGroup className="justify-content-center">{previews}</CardGroup>
      </div>
      <div className="my-3">
        <h6 className=" text-center">Mophie Hottest Deals</h6>
      </div>
    </>
  );
}
