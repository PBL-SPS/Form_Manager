var express = require("express");
var divisionRouter = express.Router();
const divisionController = require("../controllers/DivisionController");
const authenticateToken = require("../middlewares/authenticate");
const validateBody = require("../middlewares/validateBody");
const Division = require("../schemas/Division");

divisionRouter.post(
  "/create",
  authenticateToken,
  validateBody(Division.create),
  divisionController.createDivision
);

module.exports = divisionRouter;
