var express = require("express");
const adminRouter = require("./admin");
const divisionRouter = require("./division");
var router = express.Router();

router.use("/admin", adminRouter);
router.use("/division", divisionRouter);

module.exports = router;
