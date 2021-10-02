var express = require("express");
const adminRouter = require("./admin");
var router = express.Router();

router.use("/admin", adminRouter);

module.exports = router;
