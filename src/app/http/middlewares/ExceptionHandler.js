const { buildResponse, serverError, badRequest } = require('../responses');
const config = require('../../../config');


module.exports = (error, req, res, next) => {
    const statusCode = error.statusCode || config.http.code.SERVER_ERROR;
    const status = error.status || config.http.status.FAILED;
    const message = error.message || "Server Error Occured";
    const isOperational = error.isOperational || false;

    if (config.app.env === 'production') {

        if (!isOperational) {
            return serverError(res, 'Something went wrong.');
        }

        return buildResponse(res, message, status, statusCode);
    }

    return buildResponse(res, message, status, statusCode, { error: error, stack: error.stack });

}