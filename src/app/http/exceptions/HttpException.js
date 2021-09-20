const config = require('../../../config');

module.exports = class HttpException extends Error {

  constructor(message, statusCode = null) {
    super(message);
    this.statusCode = statusCode != null ? statusCode : config.http.code.SERVER_ERROR;
    this.status = `${statusCode}`.startsWith('4') ? config.http.status.FAILED : config.http.status.ERROR;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
