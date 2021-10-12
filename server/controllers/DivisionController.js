const DivisionService = require("../services/DivisionService");

exports.createDivision = async (req, res, next) => {
  try {
    let divData = req.body;
    let divisionId = await DivisionService.createDivision(divData);

    res.json({
      message: "Division created successfully",
      data: {
        id: divisionId,
      },
    });
  } catch (error) {
    return next(error);
  }
};
