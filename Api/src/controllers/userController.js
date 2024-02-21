const userModel = require('../models/userModel');


const getUserFromEmail = async (req, res) => {
    var database = "alma"
    const email = req.query.email; // Captura o email da query string
    if (!email) {
        return res.status(400).json({ message: 'Email é obrigatório.' });
    }

    // Sua lógica para buscar o usuário pelo email
    try {
        const user = await userModel.findUserByEmail(email, database);
        if (user) {
            res.json({ success: true, user });
        } else {
            res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao buscar usuário.' });
    }
};



const editUserFromEmail = async (req, res) => {
    const email = req.body.email; 
    const data = req.body; 
    var database = "alma";
    console.log(req.body);

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email é obrigatório.' });
    }

    // Sua lógica para atualizar o usuário pelo email
    try {
        const result = await userModel.editUserByEmail(email, data, database);
        if (result.affectedRows > 0) {
            res.json({ success: true, message: 'Usuário atualizado com sucesso.' });
        } else {
            res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao atualizar o usuário.' });
    }
};

const getInfoBuyByEmail = async (req, res, database) => {
    var database = "alma";
    const email = req.query.email;
    console.log(email);
    if (!email) {
        return res.status(400).json({ message: 'Email é obrigatório.' });
    }

    try {
        const user = await userModel.findUserByEmail(email, database);
        
        if (user.length > 0) {
            console.log(user);
            const userDetails = user[0];
            // Inicializa as propriedades condicionais como arrays vazios
            userDetails.vendaInformacoesAlma = [];
            userDetails.vendaEnvioImediato = [];
            userDetails.vendaRetratoColorido = [];
            userDetails.vendaRetratoPreto = [];

            // Busca informações adicionais com base nos indicadores
            if (userDetails.informacoes_alma > 0) {
                console.log('aquiii');
                userDetails.vendaInformacoesAlma = await userModel.findVendaInformacoesAlmaByUserId(userDetails.email, database);
            }
            if (userDetails.envio_imediato > 0) {
                console.log('aquiii2');
                userDetails.vendaEnvioImediato = await userModel.findVendaEnvioImediatoByUserId(userDetails.email, database);
            }
            if (userDetails.retrato_colorido > 0) {
                console.log('aquiii3');
                userDetails.vendaRetratoColorido = await userModel.findVendaRetratoColoridoByUserId(userDetails.email, database);
            }
            if (userDetails.retrato_preto > 0) {
                console.log('aquiii3');
                userDetails.vendaRetratoPreto = await userModel.findVendaRetratoPretoByUserId(userDetails.email, database);
            }

            res.json({ success: true, userDetails });
        } else {
            res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao buscar informações do usuário.' });
    }
};

module.exports = {
    getUserFromEmail,
    editUserFromEmail,
    getInfoBuyByEmail 
};




