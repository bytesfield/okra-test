const requestValidation = require('../../requests/RequestValidation');
const Auth = require('../../services/AuthService');
const { validationFailed } = require('../../responses');

let auth = new Auth();

/**
   * Login User
   * @param {object} req
   * @param {object} res
   * 
   * @returns {object} jsonResponse 
*/
const loginUser = async (req, res, next) => {

    const { error } = requestValidation.loginValidation(req.body);

    if (error) {
        return validationFailed(res, error.details[0].message);
    }

    const response = await auth.process(res, req.body.username, req.body.password);

    return response;


}
module.exports = {
    loginUser
}