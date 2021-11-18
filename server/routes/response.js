var express = require("express");
var responseRouter = express.Router();
const responseController = require("../controllers/ResponseController");
const validateBody = require("../middlewares/validateBody");
const Response = require("../schemas/Response");

responseRouter.post(
  "/create",
  validateBody(Response.create),
  responseController.createResponse
);

responseRouter.get("/getResponses/:formId", responseController.getResponses);

module.exports = responseRouter;
