const joi = require("joi");

exports.create = joi.object({
  form_id: joi.string().required(),
  response_data: joi.string().required(),
});
