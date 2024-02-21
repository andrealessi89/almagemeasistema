const connection = require('./connection');
const bcrypt = require('bcrypt');

// Função auxiliar para gerenciar conexões
async function withConnection(database, callback) {
    const pool = connection.createConnectionPool(database);
    const conn = await pool.getConnection();
    try {
        return await callback(conn);
    } finally {
        conn.release();
    }
}

const login = async (email, password, database) => {
    return withConnection(database, async (conn) => {
        const [rows] = await conn.execute(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return false; // Usuário não encontrado
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.senha);
        if (!isPasswordValid) {
            return false; // Senha inválida
        }

        // Retorna informações relevantes do usuário após login bem-sucedido
        return {
            email: user.email,
            nome_completo: user.nome_completo,
            create_time: user.create_time
        };
    }).catch((error) => {
        console.error('Erro durante a operação de login:', error);
        throw error; // Propaga o erro para tratamento adicional se necessário
    });
};

module.exports = {
    login
};
