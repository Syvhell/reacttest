import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/PreviewProducts.css";

export default function Product(props) {
  const { breakPoint, data } = props;

  const { _id, name, price, image } = data;

  return (
    <Col xs={12} md={breakPoint} mb-4>
      <Card className="cardHighlight bg-dark mx-2">
        <img src={image} className="preview card-img-top mx-auto py-3" />
        <Card.Body>
          <Card.Subtitle className="text-center">
            <Link to={`/product/${_id}`} className="text-white">
              {name}
            </Link>
          </Card.Subtitle>
          <div>
            <h5 className="text-center text-white">₱{price}</h5>
          </div>
        </Card.Body>
        <div className="footer">
          <Link className="btn btn-primary d-block" to={`/product/${_id}`}>
            Details
          </Link>
        </div>
      </Card>
    </Col>
  );
}
