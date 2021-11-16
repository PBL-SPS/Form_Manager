var express = require("express");
var yearRouter = express.Router();
const yearController = require("../controllers/YearController");
const authenticateToken = require("../middlewares/authenticate");
const validateBody = require("../middlewares/validateBody");
const Year = require("../schemas/Year");

yearRouter.post(
  "/create",
  authenticateToken,
  validateBody(Year.create),
  yearController.createYear
);

yearRouter.get("/get", yearController.getYear);

module.exports = yearRouter;
