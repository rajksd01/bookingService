const { StatusCodes } = require("http-status-codes");
const db = require("../models");

const axios = require("axios");
const AppError = require("../utils/errors/app-errors");
const { ServerConfig } = require("../config/");

async function createBooking(data) {
  return new Promise((resolve, reject) => {
    const result = db.sequelize.transaction(
      async function bookingImplementation(t) {
        const flight = await axios.get(
          `${ServerConfig.FLIGHT_REQUEST_URL}/${data.flightId}`
        );
        const flightData = flight.data.data;
        if (data.numberOfSeats > flightData.totalSeats) {
          reject(
            new AppError(
              "Not enough seats available   ",
              StatusCodes.BAD_REQUEST
            )
          );
        }
        resolve(true);
      }
    );
  });
}

module.exports = {
  createBooking,
};
