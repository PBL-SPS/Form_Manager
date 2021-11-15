var express = require("express");
var departmentRouter = express.Router();
const departmentController = require("../controllers/DepartmentController");
const authenticateToken = require("../middlewares/authenticate");
const validateBody = require("../middlewares/validateBody");
const Department = require("../schemas/Department");

departmentRouter.post(
    "/create",
    authenticateToken,
    validateBody(Department.create),
    departmentController.createDepartment
);

departmentRouter.get(
    "/get",
    departmentController.getDepartment
);

module.exports = departmentRouter;
