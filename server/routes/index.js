var express = require("express");
const adminRouter = require("./admin");
const formRouter = require("./form");
var router = express.Router();

router.use("/admin", adminRouter);
router.use("/forms", formRouter);

module.exports = router;
