
const config = require('../../../config');

module.exports = class ApiException extends Error {

  constructor(message, statusCode = null) {
    super(message);
    this.statusCode = statusCode != null ? statusCode : config.http.code.SERVER_ERROR;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
