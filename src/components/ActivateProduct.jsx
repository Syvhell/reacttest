import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ArchiveProduct({ isActive, product, fetchData }) {
  const archiveToggle = (product) => {
    fetch(
      `http://ec2-18-188-36-14.us-east-2.compute.amazonaws.com/b2/products/${product}/archive-product`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Archived Successfully Updated",
          });
          fetchData();
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please try again",
          });
          fetchData();
        }
      });
  };
  const activateToggle = (product) => {
    fetch(
      `http://ec2-18-188-36-14.us-east-2.compute.amazonaws.com/b2/products/${product}/activate-product`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Activated Successfully Updated",
          });
          fetchData();
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please try again",
          });
          fetchData();
        }
      });
  };

  return isActive === true ? (
    <button
      variant="danger"
      className="btn btn-danger bg-danger"
      size="sm"
      onClick={() => archiveToggle(product)}
    >
      Deactivate
    </button>
  ) : (
    <button
      variant="success"
      className="btn btn-success bg-success"
      size="sm"
      onClick={() => activateToggle(product)}
    >
      Reactivate
    </button>
  );
}
