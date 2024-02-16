const connection = require('./connection');
const bcrypt = require('bcrypt');


const login = async (email, password, database) => {
    // Busca o usuário pelo email
    const pool = connection.createConnectionPool(database);
    const [rows] = await pool.execute(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
    );

    if (rows.length === 0) {
        return false;
    }

    const isPasswordValid = await bcrypt.compare(password, rows[0].senha);
    if (!isPasswordValid) {
        return false;
    }

    return { email: rows[0].email, nome_completo: rows[0].nome_completo, create_time: rows[0].create_time };
};


module.exports = {
    login
};