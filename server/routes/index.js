var express = require("express");
const adminRouter = require("./admin");
const divisionRouter = require("./division");
const departmentRouter = require("./department");
const yearRouter = require("./year");
var router = express.Router();

router.use("/admin", adminRouter);
router.use("/division", divisionRouter);
router.use("/department", departmentRouter);
router.use("/year", yearRouter);

module.exports = router;
