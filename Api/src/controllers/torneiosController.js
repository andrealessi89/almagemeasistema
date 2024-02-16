const torneiosModel = require('../models/torneiosModel');

const getAllTorneios = async (req, res, database) => {
    try {
        const torneios = await torneiosModel.getAllTorneios(database);
        return res.status(200).json({ torneios });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
};

const saveTorneio = async (req, res, database) => {
    try {
        const { nome, data_torneio, qt_players } = req.body;

        if (!nome) {
            return res.status(400).json({ success: false, message: 'Nome do torneio é obrigatório.' });
        }
        if (!data_torneio) {
            return res.status(400).json({ success: false, message: 'Data do torneio é obrigatória.' });
        }
        if (!qt_players) {
            return res.status(400).json({ success: false, message: 'Quantidade de jogadores é obrigatória.' });
        }
        console.log(database);

        const savedTorneio = await torneiosModel.saveTorneio({ nome, data_torneio, qt_players }, database);

        console.log(savedTorneio);
        return res.status(201).json({
            id: savedTorneio.id,
            message: 'Torneio salvo com sucesso.',
            success: true
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao salvar torneio.' });
    }
};

const getTorneioById = async (req, res, database) => {
    try {
        const { id } = req.body;
        console.log(id);
        if (!id) {
            return res.status(400).json({ success: false, message: 'É nessário passar um id para pesquisar' });
        }
        const torneio = await torneiosModel.getTorneioById(id, database);
        return res.status(200).json({ torneio });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
};

const getTorneioByPlayer = async (req, res, database) => {
    console.log('OIIIIIIIIII', database);
    try {
        const { apelido } = req.query;
        if (!apelido) {
            return res.status(400).json({ success: false, message: 'É nessário passar um id para pesquisar' });
        }
        const torneio = await torneiosModel.getTorneioByPlayer(apelido, 'joker');
        return res.status(200).json({ torneio });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
};

const getInfoTorneioById = async (req, res, database) => {
    try{
        const { id } = req.body;
        const infoTorneio = await torneiosModel.getInfoTorneioById(id, database);
        return res.status(200).json({ infoTorneio });
    }catch (err){
        console.error(err);
        return res.status(500).json({ message: err });
    }
};


const deleteTorneio = async (req, res, database) => {
    const { id } = req.query;
    console.log(id);
    try {
        const deletedTournament = await torneiosModel.deleteTorneio(id, database);
        return res.status(200).json(deletedTournament);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    deleteTorneio
};


module.exports = {
    getAllTorneios,
    saveTorneio,
    getTorneioById,
    getInfoTorneioById,
    deleteTorneio,
    getTorneioByPlayer
};


