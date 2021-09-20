
const buildResponse = (response, message, status, statusCode, data = null, headers = null) => {
    const responseData = {
        status: status,
        statusCode: statusCode,
        message: message
    };

    if (data != null) {
        responseData.data = data;

    }

    if (headers != null) {
        return response.header(headers).status(statusCode).send(responseData)

    }

    return response.status(statusCode).send(responseData);

}

module.exports = buildResponse;