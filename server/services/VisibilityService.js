const Visibility = require("../daos/Visibility");

exports.createVisibility = async (visibilityData) => {
    try {
        return await Visibility.create(visibilityData);
    } catch (error) {
        console.error(error);
    }
};

exports.getVisibilityByFormId = async (formId) => {
    try {
        const visibility = await Visibility.get(formId);
        res.status(200).json(visibility);
    } catch (error) {
        console.error(error);
    }
};

exports.updateVisibility = async (formId, visibilityData) => {
    try {
        const visibility = await Visibility.update(formId, visibilityData);
        res.status(200).json(visibility);
    } catch (error) {
        console.error(error);
    }
};

exports.deleteVisibility = async (formId) => {
    try {
        const visibility = await Visibility.deleteByProperty("formId", formId);
        res.status(200).json(visibility);
    } catch (error) {
        console.error(error);
    }
};
