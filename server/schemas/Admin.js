const joi = require("joi");

exports.create = joi.object({
    email: joi.string().email().required(),
    first_name: joi.string().min(1).required(),
    last_name: joi.string().min(1).required(),
    password: joi.string().min(6).required(),
    contact: joi
        .string()
        .min(10)
        .max(10)
        .pattern(/^[0-9]+$/, "numbers")
        .required(),
});

exports.login = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});

exports.refreshToken = joi.object({
    refreshToken: joi.string().required(),
});
