let express = require("express");
let router = express.Router();
let VisibilityController = require("../controllers/VisibilityControlller");
const validateBody = require("../middlewares/validateBody");
const VisibilitySchema = require("../schemas/Visibility");

router.post(
  "/create",
  validateBody(VisibilitySchema.create),
  VisibilityController.createVisbility
);

router.get("/get", VisibilityController.getVisibility);

router.post(
  "/update",
  validateBody(VisibilitySchema.update),
  VisibilityController.updateVisibility
);

router.delete("/delete", VisibilityController.deleteVisibility);
