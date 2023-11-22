import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Row, Col } from "react-bootstrap";
import Banner from "./Banner";

const CourseSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        "http://ec2-18-188-36-14.us-east-2.compute.amazonaws.com/b2/products/searchByName",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productName: searchQuery }),
        }
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for courses:", error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center py-3">
        <h4 className="me-3">Product Search</h4>
        <div className="form-group mb-0 me-2">
          <input
            placeholder="Enter Product Name"
            type="text"
            id="courseName"
            className="form-control form-control-sm"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleSearch}>
          Search
        </button>
      </div>
      <Banner />
      <div className="d-flex flex-wrap gap-4 py-3">
        {searchResults.map((product) => (
          <ProductCard productProp={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default CourseSearch;
