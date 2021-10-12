const Division = require("../daos/Division");

exports.createDivision = async (divData) => {
  let divisionId = await Division.create(divData);
  return divisionId;
};
