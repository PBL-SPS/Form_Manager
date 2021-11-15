const mysql = require("mysql");
const { v4: uuidv4 } = require("uuid");

class Base {
    constructor(tableName, dbConn) {
        this.table = tableName;
        this.conn = dbConn;
    }

    async create(createData, generateId=true) {
        let data = { ...createData };
        if (generateId) {
            data.id = uuidv4();
        }
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

    async getData() {
        let sql = mysql.format("SELECT * FROM ??", [this.table]);
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

    async update(updateData, query) {
        let data = { ...updateData };
        let columns = Object.keys(data);
        let values = Object.values(data);
        let queryKeys = Object.keys(query);
        let queryValues = Object.values(query);
        let sql = "UPDATE ?? SET ";
        let markers = columns.map((_) => "?? = ?");
        let queryMarkers = Object.keys(query).map((_) => "?? = ?");
        sql =
            sql +
            markers.join(", ") +
            " WHERE " +
            queryMarkers.join(" AND ") +
            ";";

        let sequence = [];
        for (let i = 0; i < columns.length; i++) {
            sequence.push(columns[i]);
            sequence.push(values[i]);
        }
        for (let i = 0; i < queryKeys.length; i++) {
            sequence.push(queryKeys[i]);
            sequence.push(queryValues[i]);
        }

        sql = mysql.format(sql, [this.table, ...sequence]);
        let updates = await this.conn.query(sql);
        return updates;
    }

    async getAll() {
        let sql = mysql.format("SELECT * FROM ??", [this.table]);
        return this.conn.query(sql);
    }
    async getByProperty(property, value) {
        let sql = mysql.format("SELECT * FROM ?? WHERE ??=?", [
            this.table,
            property,
            value,
        ]);
        return this.conn.query(sql);
    }

    async updateByProperty(property, value, updateProperty, updateValue) {
        let sql = mysql.format("UPDATE ?? SET ??=? WHERE ??=?", [
            this.table,
            updateProperty,
            updateValue,
            property,
            value,
        ]);
        return this.conn.query(sql);
    }
}

module.exports = Base;
