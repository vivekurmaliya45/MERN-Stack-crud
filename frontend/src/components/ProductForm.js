import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Loader from "./Loder/Loader";
import {
  createProductFunction,
  fetchAllProducts,
  getSingleProductFunction,
  updateProductFunction,
} from "../apis/productsApis";

let initaialState = {
  ProductName: "",
  Price: "",
  Stock: "",
  Quantity: "",
};

const ProductForm = ({ handleClose, isOpen, idForUpdate, setAllProducts }) => {
  const [formInput, setFormInput] = useState(initaialState);
  const [showLoader, setShowLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  //Get Data For Update ProductById
  useEffect(() => {
    if (idForUpdate !== "") {
      getSingleProductFunction(idForUpdate).then((res) => {
        if (res.status === "success") {
          let obj = {};
          for (let key in formInput) {
            obj[key] = res.data[0][key];
          }
          setFormInput(obj);
        } else {
          console.log("err while geting data by Id");
        }
      });
    }
  }, [idForUpdate]);

  //Custom Form validation
  const Validate = () => {
    if (
      formInput.ProductName === "" ||
      formInput.Price === "" ||
      formInput.Quantity === "" ||
      formInput.Stock === ""
    ) {
      toast.error("Please Fill All Input");
    } else if (formInput.ProductName.length > 25) {
      toast.error("ProductName should be less than 25 charecter");
    } else if (
      formInput.Price.length > 10 ||
      formInput.Quantity.length > 10 ||
      formInput.Stock.length > 10
    ) {
      toast.error("Price ,Quantity and Stock should be less than 10 digit ");
    } else {
      handleSubmitData();
    }
  };

  //Submit Form Data
  async function handleSubmitData() {
    if (idForUpdate === "") {
      setShowLoader(true);
      let createData = await createProductFunction(formInput);
      if (createData.status === "success") {
        toast.success("Product Created");
      } else {
        toast.error("Something went wrong");
      }
      setShowLoader(false);
      handleClose("UpdateProductTable");
    } else {
      setShowLoader(true);
      let updateProduct = await updateProductFunction(idForUpdate, formInput);

      if (updateProduct.status === "success") {
        toast.success("Product Updated");
      } else {
        toast.error("Something went wrong, While Updating");
      }
      setShowLoader(false);

      handleClose("UpdateProductTable");
    }
    let data = await fetchAllProducts();
    if (data.status === "success") {
      setAllProducts(data.data);
    }
  }

  return (
    <div>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {idForUpdate === "" ? "Add Product" : "Update Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product name"
                name="ProductName"
                value={formInput.ProductName}
                onChange={handleChange}
                className={
                  formInput.ProductName.length > 25 && "border border-danger"
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter Product Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Product price"
                name="Price"
                value={formInput.Price}
                onChange={handleChange}
                className={
                  formInput.Price.length > 10 && "border border-danger"
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicQuantity">
              <Form.Label>Enter Product Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Product Quantity"
                name="Quantity"
                value={formInput.Quantity}
                onChange={handleChange}
                className={
                  formInput.Quantity.length > 10 && "border border-danger"
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStock">
              <Form.Label>Enter Product Stocks</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Product stocks"
                name="Stock"
                value={formInput.Stock}
                onChange={handleChange}
                className={
                  formInput.Stock.length > 10 && "border border-danger"
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Button
                variant="primary"
                disabled={showLoader}
                onClick={Validate}
                className="position-relative d-flex justify-content-center align-items-center"
              >
                {idForUpdate === "" ? "Submit" : "Update"}
                {showLoader && <Loader />}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductForm;
