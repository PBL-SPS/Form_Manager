const errors = require("restify-errors");

function validateBody(schema) {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      next(
        new errors.BadRequestError({
          toJSON: function () {
            return {
              code: "BadRequest",
              message: error.details.map((detail) => ({
                message: detail.message,
                context: detail.context,
                path: detail.path,
              })),
            };
          },
        })
      );
      return;
    }

    // replace request body with validated value
    // because then we have applied defaults
    req.body = value;
    next();
  };
}

module.exports = validateBody;
