var express = require("express");
const adminRouter = require("./admin");
const divisionRouter = require("./division");
const departmentRouter = require("./department");
const yearRouter = require("./year");
const formRouter = require("./form");

var router = express.Router();

router.use("/admin", adminRouter);
router.use("/division", divisionRouter);
router.use("/department", departmentRouter);
router.use("/year", yearRouter);
router.use("/forms", formRouter);

module.exports = router;
