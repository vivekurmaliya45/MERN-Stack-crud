// Basic rate-limiting middleware for Express.
const rateLimit = require("express-rate-limit");

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
});

module.exports = apiRequestLimiter;
