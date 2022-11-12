var mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "hospitalServer1",
    password: "hospitalserver1",
    database: process.env._BD_,
});

mysqlConnection.connect((err) => {
    if (err) throw new Error(err);
    console.log(`CONEXION EXITOSA A LA BASE DE DATOS`);
});

function ejecutarSQL(QUERY, VALORES) {
    mysqlConnection.query(QUERY, VALORES, (err) => {
        if (err) console.log(err + " SQL: " + QUERY + " VALORES: " + VALORES);
    });
}

function ejecutarSQLCallback(QUERY, VALORES, callback) {
    mysqlConnection.query(QUERY, VALORES, (err, ejecucion) => {
        if (err) {
            console.log(err + " SQL: " + QUERY + " VALORES: " + VALORES);
            return callback({
                error: 1,
                m: err.sqlMessage,
            });
        }
        callback(ejecucion);
    });
}

function ejecutarConfirmacionSQL(QUERY, VALORES, callback, confirmacion) {
    mysqlConnection.query(QUERY, VALORES, (err, ejecucion) => {
        if (err) {
            console.log(err + " SQL: " + QUERY + " VALORES: " + VALORES);
            return confirmacion({
                error: 1,
                m: err.sqlMessage,
            });
        }
        callback(ejecucion);
    });
}

function ejecutarResSQL(QUERY, VALORES, callback, res) {
    mysqlConnection.query(QUERY, VALORES, (err, ejecucion) => {
        if (err) {
            console.log(err + " SQL: " + QUERY + " VALORES: " + VALORES);
            return res.status(400).send({
                error: 1,
                m: err.sqlMessage,
            });
        }
        callback(ejecucion);
    });
}

module.exports = {
    ejecutarSQL: ejecutarSQL,
    ejecutarSQLCallback: ejecutarSQLCallback,
    ejecutarConfirmacionSQL: ejecutarConfirmacionSQL,
    ejecutarResSQL: ejecutarResSQL,
};