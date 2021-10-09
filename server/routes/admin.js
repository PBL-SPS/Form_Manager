var express = require("express");
var adminRouter = express.Router();
const adminControllers = require("../controllers/AdminController");
const authenticateToken = require("../middlewares/authenticate");
const validateBody = require("../middlewares/validateBody");
const Admin = require("../schemas/Admin");

adminRouter.post(
    "/create",
    validateBody(Admin.create),
    adminControllers.createAdmin
);

adminRouter.get("/getAdminByToken", authenticateToken, (req, res) => {
    let user = req.user;
    delete user.password;
    res.json({
        message: "Admin fetched successfully",
        data: user,
    });
});

adminRouter.post(
    "/login",
    validateBody(Admin.login),
    adminControllers.adminLogin
);

adminRouter.post(
    "/refreshToken",
    validateBody(Admin.refreshToken),
    adminControllers.refreshToken
);

adminRouter.get("/:adminId", adminControllers.getAdminById);
module.exports = adminRouter;
