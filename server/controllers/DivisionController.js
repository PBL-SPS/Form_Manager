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

exports.getDivision = async (req, res, next) => {
  try {
    let divData = await DivisionService.getDivision();

    res.json({
      data: divData,
    });
  } catch (error) {
    return next(error);
  }
};
