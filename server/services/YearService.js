const Year = require("../daos/Year");

exports.createYear = async (yearData) => {
  let yearId = await Year.create(yearData);
  return yearId;
};

exports.getYear = async () => {
  let yearData = await Year.get();
  return yearData;
};
