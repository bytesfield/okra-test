const config = require('../../../config');
const buildResponse = require('./buildResponse');

const statusFailed = config.http.status.FAILED;
const statusSuccess = config.http.status.SUCCESS;

const success = (response, message = null, data = null) => {
  return buildResponse(response, message, statusSuccess, config.http.code.OK, data);
};

const created = (response, message = null, data = null) => {
  return buildResponse(response, message, statusSuccess, config.http.code.CREATED, data);
};

const badRequest = (response, message = null, data = null) => {
  return buildResponse(response, message, statusFailed, config.http.code.BAD_REQUEST, data);
};

const forbidden = (response, message = null, data = null) => {
  return buildResponse(response, message, statusFailed, config.http.code.FORBIDDEN, data);
};

const notFound = (response, message = null, data = null) => {
  return buildResponse(response, message, statusFailed, config.http.code.NOT_FOUND, data);
};

const unauthorized = (response, message = null, data = null) => {
  return buildResponse(response, message, statusFailed, config.http.code.UNAUTHORIZED, data);
};

const validationFailed = (response, message = null, data = null) => {
  return buildResponse(response, message, statusFailed, config.http.code.VALIDATION_ERROR, data);
};

const serviceUnavailable = (response, message = null, data = null) => {
  return buildResponse(response, message, statusFailed, config.http.code.SERVICE_UNAVAILABLE, data);
};

const serverError = (response, message = null, data = null) => {
  return buildResponse(response, message, statusFailed, config.http.code.SERVER_ERROR, data);
};

const unprocessibleEntity = (response, message = null, data = null) => {
  return buildResponse(response, message, statusFailed, config.http.code.UNPROCESSIBLE_ENTITY, data);
};

const conflict = (response, message = null, data = null) => {
  return buildResponse(response, message, statusFailed, config.http.code.CONFLICT, data);
};

module.exports = {
  success,
  created,
  badRequest,
  forbidden,
  notFound,
  unauthorized,
  validationFailed,
  serviceUnavailable,
  serverError,
  unprocessibleEntity,
  conflict,
  buildResponse
};