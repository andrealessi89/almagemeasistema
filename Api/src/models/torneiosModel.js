const connection = require('./connection');

const getAllTorneios = async (database) => {
    const pool = connection.createConnectionPool(database);
    const [rows] = await pool.execute(
        'SELECT partida_torneio.*, ranking.nome AS ranking_nome ' +
        'FROM partida_torneio ' +
        'LEFT JOIN ranking ON partida_torneio.ranking_id = ranking.id'
    );
    return rows;
};


const getTorneioById = async (id, database) => {
    const pool = connection.createConnectionPool(database);
    const [rows] = await pool.execute('SELECT * FROM partida_torneio WHERE id = ?', [id]);
    return rows;
};

const getTorneioByPlayer = async (apelido, database) => {
    const pool = connection.createConnectionPool(database);
    const [rows] = await pool.execute('SELECT * FROM pontuacao WHERE apelido = ?', [apelido]);
    for (let i = 0; i < rows.length; i++) {
        const torneio = await getTorneioById(rows[i].torneio_id, database);
        rows[i].nome_torneio = torneio[0].nome;
        rows[i].data_torneio = torneio[0].data_torneio;
    }
    return rows;
};

const saveTorneio = async (params, database) => {
    const { nome, data_torneio, qt_players, ranking_id } = params;
    const pool = connection.createConnectionPool(database);
    const [result] = await pool.execute(
        'INSERT INTO partida_torneio (nome, data_torneio, qt_players, ranking_id) VALUES (?,?,?,?)',
        [nome, data_torneio, qt_players, ranking_id]
    );
    return { id: result.insertId };
};

const getInfoTorneioById = async (id, database) => {
    const pool = connection.createConnectionPool(database);
    const [rows] = await pool.execute('SELECT * FROM pontuacao WHERE torneio_id = ?', [id]);
    return rows;
};


const deleteTorneio = async (id, database) => {
    //PROCURA OS PLAYERS DO TORNEIO E DELETA
    const pool = connection.createConnectionPool(database);
    await pool.execute(
        'DELETE FROM pontuacao WHERE torneio_id = ?',
        [id]
    );
    
    //DELETA O TORNEIO
    const [torneioDel] = await pool.execute(
        'DELETE FROM partida_torneio WHERE id = ?',
        [id]
    );

    if(torneioDel.affectedRows === 0){
        return { success: false, message: 'Não conseguimos deletar o torneio ou ele não existe' };
    }
    
    return { success: true, message: 'Torneio removido com sucesso' };
};



module.exports = {
    getAllTorneios,
    saveTorneio,
    getTorneioById,
    getInfoTorneioById,
    deleteTorneio,
    getTorneioByPlayer
};