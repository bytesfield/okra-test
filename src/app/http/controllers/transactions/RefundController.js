const requestValidation = require('../../requests/RequestValidation');
const Refund = require('../../services/Refund');
const { validationFailed } = require('../../responses');

let refund = new Refund();

/**
   * Refund Customer
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Response} 
*/
const refundCustomer = async (req, res, next) => {

    const { error } = requestValidation.refundValidation(req.body);

    if (error) {
        return validationFailed(res, error.details[0].message);
    }

    const response = await refund.process(res, req.body.company_id, req.body.customer_id, req.body.amount);

    return response;

}

module.exports = {
    refundCustomer
}