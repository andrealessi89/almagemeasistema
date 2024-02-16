const torneiosModel = require('../models/torneiosModel');
const vendaModel = require('../models/vendaModel');
const { sendEmail } = require('../utils/sendEmail');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const VendaProdutoPrincipal = async (req, res, database) => {
    var database = 'alma';
    console.log(req.body);
    try {
        const { email, name, checkout_phone } = req.body.data.buyer;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email do comprador é obrigatório.' });
        }
        if (!name) {
            return res.status(400).json({ success: false, message: 'Nome do comprador é obrigatório.' });
        }

        // Gera uma senha aleatória
        const senhaPlana = generateRandomPassword();
        const senha = await bcrypt.hash(senhaPlana, saltRounds);
        console.log(checkout_phone);

        // Passa a senha gerada junto com os outros dados para o modelo
        const vendaResult = await vendaModel.saveUsuario({ email, name, checkout_phone, senha }, database);

        if (vendaResult.success) {
            const emailContent = {
                to: email,
                subject: 'Bem-vindo ao Sistema',
                textContent: 'Seu cadastro foi realizado com sucesso.',
                htmlContent: '<p>Seu cadastro foi realizado com sucesso. Aqui estão suas credenciais:</p>' +
                    `<p>Email: ${email}</p>` +
                    `<p>Senha: ${senhaPlana}</p>`,
            };

            const emailResponse = await sendEmail(emailContent);
            if (emailResponse.success) {
                return res.status(201).json({
                    message: 'Cadastro realizado com sucesso e email enviado.',
                    success: true,
                });
            } else {
                // Email não foi enviado, mas o cadastro foi realizado
                return res.status(201).json({
                    message: 'Cadastro realizado com sucesso, mas houve um erro ao enviar o email.',
                    success: true,
                    error: emailResponse.error,
                });
            }
        } else {
            // Tratamento de erro caso a inserção falhe
            return res.status(500).json({ message: 'Erro ao salvar dados do comprador.' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao processar a venda.' });
    }
};



const VendaRetratoColorido = async (req, res, database) => {
    var database = 'alma';
    console.log(req.body);
    try {
        const { email, name } = req.body.data.buyer;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Nome do torneio é obrigatório.' });
        }

        console.log(database);

        const vendaResult = await vendaModel.saveVendaRetratoColorido({ email, name }, database);

        if (vendaResult.success) {
            console.log(vendaResult);
            return res.status(201).json({
                message: 'Compra salva - Retrato colorido',
                success: true
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao salvar compra - Retrato colorido.' });
    }
};


const VendaEnvioImediato = async (req, res, database) => {
    var database = 'alma';
    console.log(req.body);
    try {
        const { email, name } = req.body.data.buyer;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email obrigatório' });
        }

        console.log(database);

        const vendaResult = await vendaModel.saveVendaEnvioImediato({ email, name }, database);

        if (vendaResult.success) {
            console.log(vendaResult);
            return res.status(201).json({
                message: 'Compra salva - Envio Imediato',
                success: true
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao salvar compra - Envio Imediato.' });
    }
};


const VendaInformacoesAlma = async (req, res, database) => {

    var database = 'alma';
    console.log(req.body);
    try {
        const { email, name } = req.body.data.buyer;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Nome do torneio é obrigatório.' });
        }

        console.log(database);

        const vendaResult = await vendaModel.saveVendaInformacoesAlma({ email, name }, database);

        if (vendaResult.success) {
            console.log(vendaResult);
            return res.status(201).json({
                message: 'Compra salva - Informações Alma',
                success: true
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao salvar compra - Informações' });
    }
   
};

function generateRandomPassword(length = 12) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}

module.exports = {
    VendaProdutoPrincipal,
    VendaRetratoColorido,
    VendaEnvioImediato,
    VendaInformacoesAlma,
};

