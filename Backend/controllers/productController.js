const { validationResult } = require("express-validator");
const { mysqlConnection } = require("../config/connection.js");
exports.createProduct = (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: error.errors[0].msg,
      });
    }
    const { ProductName, Price, Stock, Quantity } = req.body;

    if (ProductName == "" || Price == "" || Stock == "" || Quantity == "") {
      return res.status(400).json({
        status: "error",
        message: "Please provide all Details",
      });
    }

    let query = `INSERT INTO Product (ProductName,Price,Stock,Quantity) VALUES ('${ProductName}','${Price}','${Stock}','${Quantity}')`;

    mysqlConnection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: err,
        });
      }
      res.status(201).json({
        status: "success",
        data: result,
        message: "Product Created",
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: `Something went wrone ${err}`,
    });
  }
};

//get ALL Products
exports.getProducts = (req, res, next) => {
  try {
    let query = `SELECT * FROM Product`;

    mysqlConnection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: err,
        });
      }

      res.status(200).json({
        status: "success",
        data: result,
        message: "Product Created",
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: `Something went wrone ${err}`,
    });
  }
};

//get Products By ID
exports.getProductById = (req, res, next) => {
  let id = req.params.id;

  try {
    let query = `SELECT * FROM Product WHERE id='${id}'`;
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: err,
        });
      }

      res.status(200).json({
        status: "success",
        data: result,
        message: "Single Product ",
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: `Something went wrone ${err}`,
    });
  }
};

//UPDATE PRODUCT BY ID
exports.updateProduct = (req, res, next) => {
  let id = req.params.id;

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: error.errors[0].msg,
    });
  }
  const { ProductName, Price, Stock, Quantity } = req.body;
  const date = new Date();
  const newDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  try {
    let query = `UPDATE Product SET ProductName = '${ProductName}',Price = '${Price}',Stock = '${Stock}',Quantity = '${Quantity}',ModifiedDate = '${newDate}' WHERE id='${id}'`;

    mysqlConnection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: err,
        });
      }

      res.status(200).json({
        status: "success",
        data: result,
        message: "Product Updated",
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: `Something went wrone ${err}`,
    });
  }
};

//DELETE PRODUCT BY ID
exports.deleteProduct = (req, res, next) => {
  let id = req.params.id;
  try {
    let query = `DELETE FROM Product WHERE id='${id}'`;

    mysqlConnection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: err,
        });
      }

      res.status(200).json({
        status: "success",
        message: "Product Deleted",
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: `Something went wrone ${err}`,
    });
  }
};
