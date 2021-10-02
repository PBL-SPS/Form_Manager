const { NotFoundError } = require("restify-errors");
const Admin = require("../daos/Admin");

exports.createAdmin = async (adminData) => {
    let adminId = await Admin.create(adminData);
    return adminId;
};

exports.getAdminById = async (id) => {
    let admin = await Admin.getByProperty("id", id);
    if (admin.length === 0) throw new NotFoundError("Admin not found");
    return admin[0];
};
