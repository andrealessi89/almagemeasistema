const mysql = require('mysql2/promise');


const createConnectionPool = (database) => {
    return mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: database,
        port: process.env.MYSQL_PORT,
        waitForConnections: true,
        connectionLimit: 10, // Ajuste conforme necessário
        queueLimit: 0
    });
};


module.exports = {
    createConnectionPool
};

