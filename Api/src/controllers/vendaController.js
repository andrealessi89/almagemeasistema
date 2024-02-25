
const vendaModel = require('../models/vendaModel');
const { sendEmail } = require('../utils/sendEmail');
const bcrypt = require('bcrypt');
const moment = require('moment');
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
        const dataVenda = moment().format('YYYY-MM-DD HH:mm:ss');

        console.log(email);
        console.log(name);
        console.log(checkout_phone);
        console.log(senha);
        console.log(dataVenda);


        // Tenta salvar o usuário
        const usuarioResult = await vendaModel.saveUsuario({ email, name, checkout_phone, senha, dataVenda }, database);

        if (usuarioResult.success) {
            // Tenta salvar a venda do produto principal após salvar o usuário
            const produtoPrincipalResult = await vendaModel.saveProdutoPrincipal({ email, name, dataVenda }, database);

            if (produtoPrincipalResult.success) {
                // Se ambos, usuário e produto principal, foram salvos com sucesso
                const emailContent = {
                    to: email,
                    subject: 'El retrato de tu alma gemela está listo',
                    textContent: 'Seu cadastro foi realizado com sucesso.',
                    htmlContent: `
                    <p><strong>¡Atención especial para ti!</strong></p>
                    <p>Sabemos cuánto anhelas ver el retrato de tu alma gemela. Sin embargo, si decides no aprovechar nuestra oferta de <strong>Envío Inmediato</strong>, prepárate para la espera estándar de <strong>24 horas</strong>.</p>
                    <p><strong>¿Por qué esperar un día entero</strong> cuando tienes la oportunidad dorada de <strong>acelerar este proceso mágico</strong> ahora mismo? El Envío Inmediato te permite adelantar a otros y descubrir instantáneamente la imagen que cambiará tu vida.</p>
                    <p>Esta <strong>última llamada</strong> para el Envío Inmediato es exclusiva para ti. Si no actúas ahora, te enfrentarás a la espera obligatoria de 24 horas, un tiempo que podría parecer eterno cuando lo que más deseas está tan cerca.</p>
                    <p><strong>Esta es definitivamente tu última oportunidad</strong>. Esta oferta especial y la posibilidad de evitar la espera de 24 horas <strong>no estarán disponibles</strong> después de este mensaje. No se ofrecerá de nuevo, en ningún otro lugar ni en ningún otro momento.</p>
                    <p>La decisión es tuya: enfrentar la espera o abrazar el momento. <strong>Elige sabiamente</strong>.</p>
                    <p><a href="https://pay.hotmart.com/B89020319T?off=3l578vdu"><strong>¡Sí, quiero el Envío Inmediato y descubrir mi alma gemela ahora!</strong></a></p>
                    <p>Con esperanza y anticipación,</p>
                    <p><strong>El Equipo de Maestro Horiochi</strong></p>
                    <br>
                    <p>Y ahora, sin más preámbulos, tus credenciales de acceso para descubrir a tu alma gemela:</p>
                    <p>Usuario: ${email}</p>
                    <p>Contraseña: ${senhaPlana}</p>
                    <p><a href="https://painel.maestrohoriochi.com">Acceda al panel</a></p>
                    <p>O acceda al enlace https://painel.maestrohoriochi.com</p>
                    
                    `
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
                // Falha ao salvar a venda do produto principal
                throw new Error('Erro ao registrar a venda do produto principal.');
            }
        } else {
            // Falha ao salvar o usuário
            throw new Error('Erro ao salvar dados do comprador.');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao processar a venda: ' + err.message });
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
        const dataVenda = moment().format('YYYY-MM-DD HH:mm:ss');



        const vendaResult = await vendaModel.saveVendaRetratoColorido({ email, name, dataVenda }, database);

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

        const dataVenda = moment().format('YYYY-MM-DD HH:mm:ss');

        const vendaResult = await vendaModel.saveVendaEnvioImediato({ email, name, dataVenda }, database);

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

        const dataVenda = moment().format('YYYY-MM-DD HH:mm:ss');

        const vendaResult = await vendaModel.saveVendaInformacoesAlma({ email, name, dataVenda }, database);

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


