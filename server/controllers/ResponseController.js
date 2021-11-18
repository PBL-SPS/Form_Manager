const ResponseService = require("../services/ResponseService");

exports.createResponse = async (req, res, next) => {
  try {
    let responseId = await ResponseService.createResponse(req.body);
    res.json({
      message: "Response Added Successfully",
      data: {
        id: responseId,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getResponses = async (req, res, next) => {
  try {
    const { formId } = req.params;
    let responses = await ResponseService.getResponses(formId);
    res.json({
      message: "Responses fetched successfully",
      data: responses,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
