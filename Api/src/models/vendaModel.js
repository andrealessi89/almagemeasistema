const connection = require('./connection');





const saveUsuario = async ({ email, name, checkout_phone, senha }, database) => {

    console.log(email, name, checkout_phone, senha);
    const pool = connection.createConnectionPool(database);
    const query = `
        INSERT INTO usuarios (email, nome_completo, telefone, senha)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [email, name, checkout_phone, senha]);
    return { id: result.insertId, success: true };
};


const saveVendaRetratoColorido = async ({ email, name }, database) => {
    console.log(email);
    const pool = connection.createConnectionPool(database);

    let conn;
    try {
        conn = await pool.getConnection(); // Obtenha uma conexão diretamente
        await conn.beginTransaction(); // Inicia uma transação

        // Insere a venda na tabela venda_retrato_colorido
        const insertQuery = `
            INSERT INTO venda_retrato_colorido (email, name, actived)
            VALUES (?, ?, 1);
        `;
        const [insertResult] = await conn.query(insertQuery, [email, name]);

        if (insertResult.insertId) {
            // Atualiza o status de retrato_colorido na tabela usuarios
            const updateQuery = `
                UPDATE usuarios
                SET retrato_colorido = 1
                WHERE email = ?;
            `;
            const [updateResult] = await conn.query(updateQuery, [email]);

            if (updateResult.affectedRows === 0) {
                throw new Error('Nenhum usuário foi atualizado, verifique o email fornecido.');
            }

            await conn.commit(); // Confirma a transação
            return { success: true, message: 'Venda de Retrato Colorido registrada e usuário atualizado.' };
        } else {
            await conn.rollback(); // Desfaz as alterações se não houve inserção
            throw new Error('Erro ao inserir a venda de Retrato Colorido.');
        }
    } catch (error) {
        if (conn) await conn.rollback(); // Desfaz as alterações em caso de erro
        console.error('Erro durante a operação de venda:', error);
        return { success: false, message: error.message };
    } finally {
        if (conn) await conn.release(); // Sempre libere a conexão quando terminar
    }
};


const saveVendaEnvioImediato = async ({ email, name }, database) => {

    console.log(email);
    const pool = connection.createConnectionPool(database);

    let conn;
    try {
        conn = await pool.getConnection(); // Obtenha uma conexão diretamente
        await conn.beginTransaction(); // Inicia uma transação

        // Insere a venda na tabela venda_retrato_colorido
        const insertQuery = `
            INSERT INTO venda_envio_imediato (email, name, actived)
            VALUES (?, ?, 1);
        `;
        const [insertResult] = await conn.query(insertQuery, [email, name]);

        if (insertResult.insertId) {
            // Atualiza o status de retrato_colorido na tabela usuarios
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
            throw new Error('Erro ao inserir a venda de Envio Imediato');
        }
    } catch (error) {
        if (conn) await conn.rollback(); // Desfaz as alterações em caso de erro
        console.error('Erro durante a operação de venda:', error);
        return { success: false, message: error.message };
    } finally {
        if (conn) await conn.release(); // Sempre libere a conexão quando terminar
    }
};


const saveVendaInformacoesAlma = async ({ email, name }, database) => {

    console.log(email);
    const pool = connection.createConnectionPool(database);

    let conn;
    try {
        conn = await pool.getConnection(); // Obtenha uma conexão diretamente
        await conn.beginTransaction(); // Inicia uma transação

        // Insere a venda na tabela venda_retrato_colorido
        const insertQuery = `
            INSERT INTO venda_informacoes_alma (email, name, actived)
            VALUES (?, ?, 1);
        `;
        const [insertResult] = await conn.query(insertQuery, [email, name]);

        if (insertResult.insertId) {
            // Atualiza o status de retrato_colorido na tabela usuarios
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
            return { success: true, message: 'Venda de Informações registrada e usuário atualizado.' };
        } else {
            await conn.rollback(); // Desfaz as alterações se não houve inserção
            throw new Error('Erro ao inserir a venda de Informações');
        }
    } catch (error) {
        if (conn) await conn.rollback(); // Desfaz as alterações em caso de erro
        console.error('Erro durante a operação de venda:', error);
        return { success: false, message: error.message };
    } finally {
        if (conn) await conn.release(); // Sempre libere a conexão quando terminar
    }
};







module.exports = {
    saveUsuario,
    saveVendaRetratoColorido,
    saveVendaEnvioImediato,
    saveVendaInformacoesAlma,
};