const joi = require("joi");

exports.create = joi.object({
  department: "COMP" || "IT" || "ENTC",
  year: "FE" || "SE" || "TE" || "BE",
  division:
    "1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9" || "10" || "11",
  batch: "K" || "L" || "M" || "N",
  formId: joi.string().required(),
});

exports.update = joi.object({
  department: "COMP" || "IT" || "ENTC" || "",
  year: "FE" || "SE" || "TE" || "BE" || "",
  division:
    "1" ||
    "2" ||
    "3" ||
    "4" ||
    "5" ||
    "6" ||
    "7" ||
    "8" ||
    "9" ||
    "10" ||
    "11" ||
    "",
  batch: "K" || "L" || "M" || "N" || "",
});
