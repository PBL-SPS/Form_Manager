const { BadRequestError, ConflictError } = require("restify-errors");
const { TABLES } = require("../shared/constants");
const Base = require("./Base");
const dbConn = require("./db");
const bcrypt = require("bcrypt");

class Admin extends Base {
    constructor(tableName, conn) {
        super(tableName, conn);
    }

    async create(createData) {
        try {
            createData.password = await bcrypt.hash(createData.password, 10);
            return await super.create(createData);
        } catch (error) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new ConflictError("Email already exists");
            }

            throw error;
        }
    }
}

module.exports = new Admin(TABLES.ADMIN, dbConn);
