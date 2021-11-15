const { TABLES } = require("../shared/constants");
const dbConn = require("./db");
const Base = require("./Base");

class Division extends Base {
  constructor(tablename, conn) {
    super(tablename, conn);
  }

  async create(createdata) {
    try {
      return await super.create(createdata);
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

module.exports = new Division(TABLES.DIVISION, dbConn);
