const mysql = require('mysql2/promise');

let pool; // Variável global para armazenar a pool de conexão

const createConnectionPool = (database) => {
    if (!pool) { // Verifica se a pool ainda não foi criada
        pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: database,
            port: process.env.MYSQL_PORT,
            waitForConnections: true,
            connectionLimit: 10000, // Ajuste conforme necessário
            queueLimit: 0
        });
    }
    return pool;
};

module.exports = {
    createConnectionPool
};
