const VisibilityService = require("../services/VisibilityService");

exports.createVisibility = async (req, res) => {
  try {
    const visibility = await VisibilityService.createVisibility(req.body);
    res.status(201).send(visibility);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateVisibility = async (req, res) => {
  try {
    const visibility = await VisibilityService.updateVisibility(
      req.params.id,
      req.body
    );
    res.status(200).send(visibility);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getVisibility = async (req, res) => {
  try {
    const visibility = await VisibilityService.getVisibilityByFormId(
      req.params.id
    );
    res.status(200).send(visibility);
  } catch (error) {
    res.status(400).send(error);
  }
};

// exports.getVisibilities = async (req, res) => {
//   try {
//     const visibilities = await VisibilityService.getVisibilities();
//     res.status(200).send(visibilities);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

exports.deleteVisibility = async (req, res) => {
  try {
    const visibility = await VisibilityService.deleteVisibility(req.params.id);
    res.status(200).send(visibility);
  } catch (error) {
    res.status(400).send(error);
  }
};
