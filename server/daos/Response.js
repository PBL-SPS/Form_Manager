const { BadRequestError, ConflictError } = require("restify-errors");
const { TABLES } = require("../shared/constants");
const mysql = require("mysql");
const Base = require("./Base");
const dbConn = require("./db");

class Response extends Base {
  constructor(tableName, conn) {
    super(tableName, conn);
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

module.exports = new Response(TABLES.RESPONSE, dbConn);
