const { BadRequestError, ConflictError } = require("restify-errors");
const { TABLES } = require("../shared/constants");
const mysql = require("mysql");
const Base = require("./Base");
const dbConn = require("./db");

class Form extends Base {
    constructor(tableName, conn) {
        super(tableName, conn);
    }

    async getAll() {
        let sql = mysql.format(
            "SELECT f.*, v.visibilities FROM ?? f LEFT JOIN (SELECT  form_id, JSON_ARRAYAGG(JSON_OBJECT('id', id, 'department_id', department_id, 'year_id', year_id, 'division_id', division_id)) AS visibilities FROM ?? GROUP BY form_id) v ON v.form_id = f.id;",
            [this.table, TABLES.VISIBILITY]
        );
        let data = await this.conn.query(sql);
        data = data.map((d) => {
            d.visibilities = JSON.parse(d.visibilities) || [];
            return d;
        });
        return data;
    }
}

module.exports = new Form(TABLES.FORM, dbConn);
