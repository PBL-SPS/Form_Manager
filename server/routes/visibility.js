let express = require("express");
let router = express.Router();
let VisibilityController = require("../controllers/VisibilityController");
const validateBody = require("../middlewares/validateBody");
const VisibilitySchema = require("../schemas/Visibility");

router.post(
    "/create",
    // validateBody(VisibilitySchema.create),
    VisibilityController.createVisibility
);

router.get("/get", VisibilityController.getVisibility);

router.post(
    "/update",
    validateBody(VisibilitySchema.update),
    VisibilityController.updateVisibility
);

router.delete("/delete", VisibilityController.deleteVisibility);

module.exports = router;
