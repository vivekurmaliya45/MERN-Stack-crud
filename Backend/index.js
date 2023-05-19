const express = require("express");
require("dotenv").config();
const cors = require("cors");
const hpp = require("hpp");
const compression = require("compression");
const { connectToDB } = require("./config/connection.js");
const apiRequestLimiter = require("./utils/apiRequestLimiter.js");
const router = require("./routes/productRoutes.js");
// Start express app
const app = express();

//Connect To Database
connectToDB();

// express.json, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

//MIDDLEWAREs
app.use(cors());
app.options("*", cors());

// Limit requests from same API
app.use(apiRequestLimiter);

// Prevent parameter pollution
app.use(hpp({}));
// Compressing or decompressing a stream.
app.use(compression());

//Routes
app.use("/api", router);

//Establish the server connection
const port = process.env.PORT || 300;
app.listen(port, () => console.log(`Listening on port ${port}..`));
