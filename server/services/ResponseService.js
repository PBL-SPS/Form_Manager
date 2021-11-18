const Response = require("../daos/Response");

exports.createResponse = async (responseData) => {
  let responseId = await Response.create(responseData);
  return responseId;
};

exports.getResponses = async (formId) => {
  let responses = await Response.getByProperty("form_id", formId);
  return responses;
};
