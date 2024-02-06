const { BookingServices } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createBooking(req, res) {
  try {
    console.log(req.body.flightId);
    const booking = await BookingServices.createBooking({
      flightId: req.body.flightId,
      userId: req.body.userId,
      numberOfSeats: req.body.numberOfSeats,
    });
    SuccessResponse.data = booking.data;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

module.exports = {
  createBooking,
};
