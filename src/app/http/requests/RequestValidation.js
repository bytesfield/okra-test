const Joi = require('joi');


const refundValidation = (data) => {

    const refundSchema = Joi.object({
        company_id: Joi.string()
            .max(255)
            .required(),
        customer_id: Joi.string()
            .max(255)
            .required(),
        amount: Joi.number()
            .required()
    });

    return refundSchema.validate(data);

}

module.exports = {
    refundValidation

};
