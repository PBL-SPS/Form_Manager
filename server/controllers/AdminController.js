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
