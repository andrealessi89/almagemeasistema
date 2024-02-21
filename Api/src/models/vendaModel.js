const connection = require('./connection');

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

const saveUsuario = async ({ email, name, checkout_phone, senha, dataVenda }, database) => {
    return withConnection(database, async (conn) => {
        const query = ' INSERT INTO usuarios (email, nome_completo, telefone, senha, dataVenda) VALUES (?, ?, ?, ?, ?)';
        const [result] = await conn.execute(query, [email, name, checkout_phone, senha, dataVenda]);
        return { id: result.insertId, success: true };
    });
};


const saveProdutoPrincipal = async ({ email, name, dataVenda }, database) => {
    return withConnection(database, async (conn) => {
        await conn.beginTransaction();
        const insertQuery = 'INSERT INTO venda_retrato_preto(email, name, actived, dataVenda) VALUES (?, ?, 1, ?)';
        const [insertResult] = await conn.query(insertQuery, [email, name, dataVenda]);

        if (insertResult.insertId) {
            const updateQuery = 'UPDATE usuarios SET retrato_preto = 1 WHERE email = ?';
            const [updateResult] = await conn.query(updateQuery, [email]);

            if (updateResult.affectedRows === 0) {
                throw new Error('Nenhum usuário foi atualizado, verifique o email fornecido.');
            }

            await conn.commit();
            return { success: true, message: 'Venda de Retrato Principal registrada e usuário atualizado.' };
        } else {
            throw new Error('Erro ao inserir a venda de Retrato Principal.');
        }
    }).catch(async (error, conn) => {
        if (conn) await conn.rollback();
        console.error('Erro durante a operação de venda:', error);
        throw error; // Propague o erro para ser tratado pelo catch externo
    });
};


const saveVendaRetratoColorido = async ({ email, name, dataVenda }, database) => {
    return withConnection(database, async (conn) => {
        await conn.beginTransaction();
        const insertQuery = 'INSERT INTO venda_retrato_colorido (email, name, actived, dataVenda) VALUES (?, ?, 1, ?)';
        const [insertResult] = await conn.query(insertQuery, [email, name, dataVenda]);

        if (insertResult.insertId) {
            const updateQuery = 'UPDATE usuarios SET retrato_colorido = 1 WHERE email = ?';
            const [updateResult] = await conn.query(updateQuery, [email]);

            if (updateResult.affectedRows === 0) {
                throw new Error('Nenhum usuário foi atualizado, verifique o email fornecido.');
            }

            await conn.commit();
            return { success: true, message: 'Venda de Retrato Colorido registrada e usuário atualizado.' };
        } else {
            throw new Error('Erro ao inserir a venda de Retrato Colorido.');
        }
    }).catch(async (error, conn) => {
        if (conn) await conn.rollback();
        console.error('Erro durante a operação de venda:', error);
        throw error; // Propague o erro para ser tratado pelo catch externo
    });
};


const saveVendaEnvioImediato = async ({ email, name, dataVenda }, database) => {
    return withConnection(database, async (conn) => {
        await conn.beginTransaction(); // Inicia uma transação

        // Insere a venda na tabela venda_envio_imediato
        const insertQuery = `
            INSERT INTO venda_envio_imediato (email, name, actived, dataVenda)
            VALUES (?, ?, 1, ?);
        `;
        const [insertResult] = await conn.query(insertQuery, [email, name, dataVenda]);

        if (insertResult.insertId) {
            // Atualiza o status de envio_imediato na tabela usuarios
            const updateQuery = `
                UPDATE usuarios
                SET envio_imediato = 1
                WHERE email = ?;
            `;
            const [updateResult] = await conn.query(updateQuery, [email]);

            if (updateResult.affectedRows === 0) {
                throw new Error('Nenhum usuário foi atualizado, verifique o email fornecido.');
            }

            await conn.commit(); // Confirma a transação
            return { success: true, message: 'Venda de Envio Imediato registrada e usuário atualizado.' };
        } else {
            await conn.rollback(); // Desfaz as alterações se não houve inserção
            throw new Error('Erro ao inserir a venda de Envio Imediato.');
        }
    }).catch(async (error, conn) => {
        if (conn) await conn.rollback(); // Garante rollback em caso de erro dentro do callback
        console.error('Erro durante a operação de venda:', error);
        throw error; // Propaga o erro para ser tratado pelo catch externo
    });
};


const saveVendaInformacoesAlma = async ({ email, name, dataVenda }, database) => {
    return withConnection(database, async (conn) => {
        await conn.beginTransaction(); // Inicia uma transação

        // Insere a venda na tabela venda_envio_imediato
        const insertQuery = `
            INSERT INTO venda_informacoes_alma (email, name, actived, dataVenda)
            VALUES (?, ?, 1, ?);
        `;
        const [insertResult] = await conn.query(insertQuery, [email, name, dataVenda]);

        if (insertResult.insertId) {
            // Atualiza o status de envio_imediato na tabela usuarios
            const updateQuery = `
                UPDATE usuarios
                SET informacoes_alma = 1
                WHERE email = ?;
            `;
            const [updateResult] = await conn.query(updateQuery, [email]);

            if (updateResult.affectedRows === 0) {
                throw new Error('Nenhum usuário foi atualizado, verifique o email fornecido.');
            }

            await conn.commit(); // Confirma a transação
            return { success: true, message: 'Venda de Informacoes Alma registrada e usuário atualizado.' };
        } else {
            await conn.rollback(); // Desfaz as alterações se não houve inserção
            throw new Error('Erro ao inserir a venda de Informacoes alma.');
        }
    }).catch(async (error, conn) => {
        if (conn) await conn.rollback(); // Garante rollback em caso de erro dentro do callback
        console.error('Erro durante a operação de venda:', error);
        throw error; // Propaga o erro para ser tratado pelo catch externo
    });
};










module.exports = {
    saveUsuario,
    saveVendaRetratoColorido,
    saveVendaEnvioImediato,
    saveVendaInformacoesAlma,
    saveProdutoPrincipal
};