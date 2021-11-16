const { TABLES } = require("../shared/constants");
const dbConn = require("./db");
const Base = require("./Base");

class Department extends Base {
  constructor(tablename, conn) {
    super(tablename, conn);
  }

  async create(createdata) {
    try {
      return await super.create(createdata, false);
    } catch (error) {
      throw error;
    }
  }

  async get() {
    try {
      return await super.getData();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Department(TABLES.DEPARTMENT, dbConn);
