const joi = require("joi");

exports.create = joi.object({
  name: joi.string().required(),
});
