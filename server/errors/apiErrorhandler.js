const errors = require("restify-errors");

function apiErrorHandler(err, req, res, next) {
    console.error(err);

    if (err.statusCode) {
        return res.status(err.statusCode).json(err);
    }
    return res
        .status(500)
        .send(new errors.InternalServerError("Something went wrong"));
}

module.exports = apiErrorHandler;
