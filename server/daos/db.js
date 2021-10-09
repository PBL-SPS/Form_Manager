const util = require("util");
const mysql = require("mysql");
const path = require("path");
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "development") {
    require("dotenv").config({
        path: path.join(__dirname, "../.env.development"),
    });
}

console.log({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const dbConn = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Ping database to check for common exception errors.
dbConn.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("Database connection was closed.");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("Database has too many connections.");
        }
        if (err.code === "ECONNREFUSED") {
            console.error("Database connection was refused.");
        }
    }

    if (connection) connection.release();

    return;
});

// Promisify for Node.js async/await.
dbConn.query = util.promisify(dbConn.query);

module.exports = dbConn;
