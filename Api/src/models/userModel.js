const connection = require('./connection');
const moment = require('moment');

// Utiliza uma função auxiliar para obter uma conexão e liberá-la automaticamente
async function withConnection(database, callback) {
    const pool = connection.createConnectionPool(database);
    const conn = await pool.getConnection();
    try {
        return await callback(conn);
    } finally {
        conn.release();
    }
}

const findUserByEmail = async (email, database) => {
    return withConnection(database, async (conn) => {
        const [rows] = await conn.execute('SELECT id, email, telefone, data_nacimento, interesse, signo, retrato_colorido, envio_imediato, informacoes_alma, retrato_preto, dataVenda, url_img, informacoes FROM usuarios WHERE email = ?', [email]);
        return rows;
    });
};

const editUserByEmail = async (email, data, database) => {
    return withConnection(database, async (conn) => {
        const { nome, dataNascimento, interesse, sexo, signo, estadoCivil, url_img, informacoes } = data;
        const query = 'UPDATE usuarios SET nome = ?, data_nacimento = ?, interesse = ?, sexo = ?, signo = ?, estado_civil = ?, url_img = ?, informacoes = ? WHERE email = ?';
        const params = [nome, dataNascimento, interesse, sexo, signo, estadoCivil, url_img, informacoes, email ];
        const [result] = await conn.execute(query, params);
        return result;
    });
};

const findVendaRetratoPretoByUserId = async (email, database) => {
    return withConnection(database, async (conn) => {
        const [rows] = await conn.execute('SELECT * FROM venda_retrato_preto WHERE email = ?', [email]);
        return rows;
    });
};

const findVendaInformacoesAlmaByUserId = async (email, database) => {
    return withConnection(database, async (conn) => {
        const [rows] = await conn.execute('SELECT * FROM venda_informacoes_alma WHERE email = ?', [email]);
        return rows;
    });
};

const findVendaEnvioImediatoByUserId = async (email, database) => {
    return withConnection(database, async (conn) => {
        const [rows] = await conn.execute('SELECT * FROM venda_envio_imediato WHERE email = ?', [email]);
        return rows;
    });
};

const findVendaRetratoColoridoByUserId = async (email, database) => {
    return withConnection(database, async (conn) => {
        const [rows] = await conn.execute('SELECT * FROM venda_retrato_colorido WHERE email = ?', [email]);
        return rows;
    });
};

module.exports = {
    findUserByEmail,
    editUserByEmail,
    findVendaInformacoesAlmaByUserId,
    findVendaEnvioImediatoByUserId,
    findVendaRetratoColoridoByUserId,
    findVendaRetratoPretoByUserId
};
