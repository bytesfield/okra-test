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

const loginValidation = (data) => {

    const loginSchema = Joi.object({

        username: Joi.string()
            .required(),
        password: Joi.string()
            .required()

    });

    return loginSchema.validate(data);

}

module.exports = {
    refundValidation,
    loginValidation
};
