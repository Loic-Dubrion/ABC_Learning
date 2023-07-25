const {
  Error400,
  Error401,
  Error403,
  Error404,
  Error409,
} = require('./index');
const sendEmail = require('../services/mailer/sender');
const logger = require('../services/logger');

function apiErrorHandler(err, __req, res) {
  logger.error(err);

  // Check the type of error and handle accordingly
  if (
    err instanceof Error400 // Bad Request error
    || err instanceof Error401 // Unauthorized error
    || err instanceof Error403 // Forbidden error
    || err instanceof Error404 // Not Found error
    || err instanceof Error409 // Conflict error
  ) {
    res.status(err.httpStatusCode).json({
      httpCode: err.httpStatusCode,
      status: 'error',
      message: err.message,
    });
  } else {
    // Handle other types of errors with a generic 500 Internal Server Error response
    res.status(500).json({
      httpCode: 500,
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}

module.exports = apiErrorHandler;
