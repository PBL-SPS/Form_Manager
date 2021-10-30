const joi = require("joi");

exports.create = joi.object({
    title: joi.string().required(),
    description: joi.string().optional(),
    is_active: joi.boolean().optional(),
    form_data: joi.string().required(),
    deadline: joi.date().iso().optional(),
});

exports.edit = joi.object({
    title: joi.string().min(1).optional(),
    description: joi.string().optional(),
    is_active: joi.boolean().optional(),
    form_data: joi.string().optional(),
    deadline: joi.date().iso().optional(),
});
