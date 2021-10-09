const { NotFoundError, ForbiddenError } = require("restify-errors");
const Admin = require("../daos/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createAdmin = async (adminData) => {
    let adminId = await Admin.create(adminData);
    return adminId;
};

exports.getAdminById = async (id) => {
    let admin = await Admin.getByProperty("id", id);
    if (admin.length === 0) throw new NotFoundError("Admin not found");
    return admin[0];
};

exports.getAdminBy = async (key, value) => {
    let admin = await Admin.getByProperty(key, value);
    if (admin.length === 0) throw new NotFoundError("Admin not found");
    return admin[0];
};

exports.authenticate = async (email, password) => {
    let admin = await this.getAdminBy("email", email);
    if (await bcrypt.compare(password, admin.password)) {
        const accessToken = jwt.sign(
            { id: admin.id },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1d",
            }
        );

        const refreshToken = jwt.sign(
            { id: admin.id },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "15d",
            }
        );

        delete admin.password;
        return {
            accessToken,
            refreshToken,
            user: admin,
        };
    }
    throw new ForbiddenError("Wrong password");
};

exports.tokenRefresh = async (refreshToken) => {
    let payload = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    let admin = await this.getAdminById(payload.id);

    const accessToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });

    const newRefreshToken = jwt.sign(
        { id: admin.id },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "15d",
        }
    );

    return {
        accessToken,
        refreshToken: newRefreshToken,
    };
};
