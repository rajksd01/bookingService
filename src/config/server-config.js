const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  FLIGHT_REQUEST_URL: process.env.FLIGHT_REQUEST_URL,
};
