const mysql = require("mysql");
const { v4: uuidv4 } = require("uuid");

class Base {
    constructor(tableName, dbConn) {
        this.table = tableName;
        this.conn = dbConn;
    }

    async create(createData) {
        let data = { ...createData };
        data.id = uuidv4();
        let columns = Object.keys(data);
        let values = Object.values(data);
        let sql = "INSERT INTO ?? ";
        let colMarkers = columns.map((_) => "??");
        let valMarkers = values.map((_) => "?");
        sql =
            sql +
            "(" +
            colMarkers.join(",") +
            ") VALUES (" +
            valMarkers.join(",") +
            ");";
        sql = mysql.format(sql, [this.table, ...columns, ...values]);
        await this.conn.query(sql);
        return data.id;
    }

    async getByProperty(property, value) {
        let sql = mysql.format("SELECT * FROM ?? WHERE ??=?", [
            this.table,
            property,
            value,
        ]);
        return this.conn.query(sql);
    }

    async deleteByProperty(property, value) {
        let sql = mysql.format("DELETE FROM ?? WHERE ??=?", [
            this.table,
            property,
            value,
        ]);
        return this.conn.query(sql);
    }
}

module.exports = Base;
