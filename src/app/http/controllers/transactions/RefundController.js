const JsonResponse = require('../../../modules/JsonResponse');
const Helpers = require('../../../modules/Helpers');
const { httpStatus } = require('../../../../config/status');
const requestValidation = require('../../requests/RequestValidation');
const Refund = require('../../services/Refund');

let jsonResponse = new JsonResponse();
let refund = new Refund();

/**
   * Refund Customer
   * @param {object} req
   * @param {object} res
   * 
   * @returns {object} jsonResponse 
*/
const refundCustomer = async (req, res, next) => {

    // Validate request
    const { error } = requestValidation.refundValidation(req.body);

    if (error) {
        return res.status(httpStatus.VALIDATION_ERROR)
            .send(jsonResponse.failedValidation('Failed Validation', error.details[0].message));
    }

    const response = await refund.process(req.body.company_id, req.body.customer_id, req.body.amount);

    if (response[0].status && response[0].status === 'success') {
        return res.status(httpStatus.OK).send(jsonResponse.success('Refund Processed Successfully', response));
    }

    return res.status(httpStatus.BAD_REQUEST).send(jsonResponse.badRequest(response));
}

module.exports = {
    refundCustomer
}