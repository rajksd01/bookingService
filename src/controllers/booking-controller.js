const { BookingServices } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const inMemDb = {};
async function createBooking(req, res) {
  try {
    const response = await BookingServices.createBooking({
      flightId: req.body.flightId,
      userId: req.body.userId,
      numberOfSeats: req.body.numberOfSeats,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function makePayment(req, res) {
  try {
    const idempotencyKey = req.headers["x-idempotency-key"];
    if (!idempotencyKey) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "idempotency key missing" });
    }
    if (inMemDb[idempotencyKey]) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Cannot retry on a successful payment" });
    }
    const response = await BookingServices.makePayment({
      totalCost: req.body.totalCost,
      userId: req.body.userId,
      bookingId: req.body.bookingId,
    });
    inMemDb[idempotencyKey] = idempotencyKey;
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function getBookings(req, res) {
  try {
    const bookings = await BookingServices.getBookings();
    SuccessResponse.data = bookings;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.error(error);
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}
module.exports = {
  createBooking,
  makePayment,
  getBookings,
};
