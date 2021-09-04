const JsonResponse = require('../../../modules/JsonResponse');
const Helpers = require('../../../modules/Helpers');
const { httpStatus } = require('../../../../config/status');
const requestValidation = require('../../requests/RequestValidation');
const Auth = require('../../services/AuthService');


let jsonResponse = new JsonResponse();
let auth = new Auth();

/**
   * Login User
   * @param {object} req
   * @param {object} res
   * 
   * @returns {object} jsonResponse 
*/
const loginUser = async (req, res, next) => {

    // Validate request
    const { error } = requestValidation.loginValidation(req.body);

    if (error) {
        return res.status(httpStatus.VALIDATION_ERROR)
            .send(jsonResponse.failedValidation('Failed Validation', error.details[0].message));
    }

    const response = await auth.process(req.body.username, req.body.password);

    if (response.status && response.status === 'success') {
        return res.status(httpStatus.OK).send(response);

    }

    return res.status(httpStatus.BAD_REQUEST).send(response);

}
module.exports = {
    loginUser
}