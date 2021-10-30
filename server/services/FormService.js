const Form = require("../daos/Form");
const moment = require("moment");

exports.createForm = async (formData) => {
    let formId = await Form.create(formData);
    return formId;
};

exports.editForm = async (formId, editData) => {
    editData.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
    let id = await Form.update(editData, { id: formId });
    return id;
};

exports.deleteForm = async (formId) => {
    await Form.deleteByProperty("id", formId);
};

exports.getFormById = async (formId) => {
    let form = await Form.getByProperty("id", formId);
    return form;
};

exports.getFormWithFilters = async (filters) => {
    return await Form.getAll();
};
