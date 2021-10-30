var express = require("express");
var formRouter = express.Router();
const formControllers = require("../controllers/FormControllers");
const authenticateToken = require("../middlewares/authenticate");
const validateBody = require("../middlewares/validateBody");
const Form = require("../schemas/Form");

formRouter.post(
    "/create",
    validateBody(Form.create),
    authenticateToken,
    formControllers.createForm
);

formRouter.get("/:formId", formControllers.getFormById);

formRouter.get("/", formControllers.getFormWithFilters);

formRouter.post(
    "/:formId/edit",
    validateBody(Form.edit),
    authenticateToken,
    formControllers.editForm
);

formRouter.delete(
    "/:formId/delete",
    authenticateToken,
    formControllers.deleteForm
);

module.exports = formRouter;
