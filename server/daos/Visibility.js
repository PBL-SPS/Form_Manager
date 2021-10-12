const { TABLES } = require("../shared/constants");
const Base = require("./Base");
const dbConn = require("./db");

class Visibility extends Base {
  constructor(tableName, conn) {
    super(tableName, conn);
  }

  async create(visibility) {
    try {
      // const { department, year, division, batch} = visibility;
      return await super.create(visibility);
    } catch (error) {
      console.error(error);
    }
  }

  async update(formId, visibility) {
    try {
      const { department, year, division, batch } = visibility;
      const result = await this.conn.query(
        `UPDATE ${
          super.table
        } SET department = $1, year = $2, division = $3, batch = $4 WHERE formId = $5`,
        [department, year, division, batch, formId]
      );
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async updateByProperty(property, value, updateProperty, updateValue) {
    try {
      return await super.updateByProperty(
        property,
        value,
        updateProperty,
        updateValue
      );
    } catch (error) {
      console.error(error);
    }
  }

  async deteteByProperty(property, value) {
    try {
      return super.deleteByProperty(property, value);
    } catch (error) {
      console.error(error);
    }
  }

  async get(formId) {
    try {
      return await super.getByProperty("formId", formId);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new Visibility(TABLES.VISIBILITY, dbConn);
