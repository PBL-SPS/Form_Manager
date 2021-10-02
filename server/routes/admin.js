var express = require("express");
var adminRouter = express.Router();
const adminControllers = require("../controllers/AdminController");
const validateBody = require("../middlewares/validateBody");
const Admin = require("../schemas/Admin");

adminRouter.post("/create", validateBody(Admin), adminControllers.createAdmin);

module.exports = adminRouter;
