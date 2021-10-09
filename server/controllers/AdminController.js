const AdminService = require("../services/AdminService");

exports.createAdmin = async (req, res, next) => {
    try {
        let adminData = req.body;
        let adminId = await AdminService.createAdmin(adminData);

        res.json({
            message: "Admin Created Successfully",
            data: {
                id: adminId,
            },
        });
    } catch (error) {
        return next(error);
    }
};

exports.getAdminById = async (req, res, next) => {
    try {
        let { adminId } = req.params;
        let adminData = await AdminService.getAdminById(adminId);

        delete adminData["password"];

        res.json({
            message: "Admin fetched Successfully",
            data: adminData,
        });
    } catch (error) {
        return next(error);
    }
};

exports.adminLogin = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        let adminData = await AdminService.authenticate(email, password);

        res.json({
            message: "Admin Authenticated Successfully",
            data: adminData,
        });
    } catch (error) {
        return next(error);
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        let { refreshToken } = req.body;
        let token = await AdminService.tokenRefresh(refreshToken);

        res.json({
            message: "Token refreshed Successfully",
            data: token,
        });
    } catch (error) {
        return next(error);
    }
};
