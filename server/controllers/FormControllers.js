const moment = require("moment");
const FormService = require("../services/FormService");

exports.createForm = async (req, res, next) => {
    try {
        const user = req.user;
        req.body.created_by = user.id;
        if (req.body.deadline) {
            req.body.deadline = moment(new Date(req.body.deadline)).format(
                "YYYY-MM-DD HH:mm:ss"
            );
        }
        let formId = await FormService.createForm(req.body);
        res.json({
            message: "Form Created Successfully",
            data: {
                id: formId,
            },
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.editForm = async (req, res, next) => {
    try {
        const { formId } = req.params;
        const data = req.body;
        let id = await FormService.editForm(formId, data);
        res.json({
            message: "Form edited Successfully",
            data: {
                id: id,
            },
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.deleteForm = async (req, res, next) => {
    try {
        const { formId } = req.params;
        await FormService.deleteForm(formId);
        res.json({
            message: "Form deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getFormById = async (req, res, next) => {
    try {
        const { formId } = req.params;
        let form = await FormService.getFormById(formId);
        res.json({
            message: "Form fetched Successfully",
            data: form,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getFormWithFilters = async (req, res, next) => {
    try {
        let forms = await FormService.getFormWithFilters();
        res.json({
            message: "Forms fetched Successfully",
            data: forms,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
