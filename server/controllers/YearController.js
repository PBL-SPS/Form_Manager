const YearService = require("../services/YearService");

exports.createYear = async (req, res, next) => {
  try {
    let yearData = req.body;
    let yearId = await YearService.createYear(yearData);

    res.json({
      message: "Year created successfully",
      data: {
        id: yearId,
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.getYear = async (req, res, next) => {
  try {
    let yearData = await YearService.getYear();

    res.json({
      data: yearData,
    });
  } catch (error) {
    return next(error);
  }
};
