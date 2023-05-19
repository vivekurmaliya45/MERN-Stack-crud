// Axios is a promise-based HTTP Client for node.
import axios from "axios";

// back-end api urlencoded client
const URL = "http://localhost:3001/api";

//Fetch All Products From Database
async function fetchAllProducts() {
  try {
    //CALLING GET API
    const res = await axios.get(`${URL}/product/get`);
    return res.data;
  } catch (err) {
    return err;
  }
}

//GET SINGLE PRODUCT BY ID
async function getSingleProductFunction(id) {
  try {
    //CALLING GET API
    const res = await axios.get(`${URL}/product/get/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
}

//Create Products And save product from database
async function createProductFunction(values) {
  try {
    //CALLING POST API
    const res = await axios.post(`${URL}/product/create`, values);
    return res.data;
  } catch (err) {
    return err;
  }
}

//UPDATE SINGLE PRODUCT BY ID
async function updateProductFunction(id, values) {
  try {
    //CALLING PUT API
    const res = await axios.put(`${URL}/product/update/${id}`, values);
    return res.data;
  } catch (err) {
    return err;
  }
}

//DELETE SINGLE PRODUCT BY ID
async function deleteProductFunction(id) {
  try {
    //CALLING DELETE API
    const res = await axios.delete(`${URL}/product/delete/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
}

export {
  fetchAllProducts,
  getSingleProductFunction,
  createProductFunction,
  updateProductFunction,
  deleteProductFunction,
};
