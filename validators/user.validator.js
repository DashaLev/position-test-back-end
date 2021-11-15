const joi = require('joi');

const { EMAIL_REGEXP, PASSWORD_REGEXP, userTypes } = require('../configs');

const createUserValidator = joi.object({
    user_name: joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    first_name: joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    last_name: joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: joi
        .string()
        .regex(EMAIL_REGEXP)
        .required(),
    password: joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required(),
    type: joi
        .string()
        .allow(...Object.values(userTypes))
});

const updateUserValidator = joi.object({
    first_name: joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),
    last_name: joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
});

module.exports = {
    createUserValidator,
    updateUserValidator
};
