
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
                        <p>Su acceso al sistema para ver el retrato de su alma gemela está justo abajo. Acceda al enlace con el usuario y contraseña:</p>
                        <p>Usuario: ${email}</p>
                        <p>Contraseña: ${senhaPlana}</p>
                        <p><a href="https://painel.maestrohoriochi.com">Acceda al panel</a></p>
                        <p>O acceda al enlace https://painel.maestrohoriochi.com</p>
                        <br>
                        <p><strong>¡Atención exclusiva para usted!</strong></p>
                        <p>Entendemos el profundo deseo de conectar con su alma gemela. Por eso, le presentamos una <strong>ÚLTIMA OPORTUNIDAD imperdible</strong> para acelerar este encuentro celestial.</p>
                        <p><strong>El "Envio Inmediato"</strong> es su llave dorada para desbloquear el retrato de su alma gemela <strong>ahora mismo</strong>. Esta opción exclusiva está a punto de desvanecerse, y con ella, la oportunidad de acortar la espera.</p>
                        <p>Esta es su <strong>última chance</strong> para aprovechar este servicio especial. ¿Va a dejar pasar el momento de conocer a su alma gemela sin demoras?</p>
                        <p>No permita que el tiempo se interponga en su camino hacia el amor verdadero. <strong>Actúe ahora</strong> y asegure su "Envio Inmediato".</p>
                        <p><a href="https://pay.hotmart.com/B89020319T?off=3l578vdu">¡Sí, quiero mi envío inmediato!</a></p>
                        <p>Recuerde, esta es una <strong>oferta de tiempo limitado</strong>, diseñada exclusivamente para aquellos que, como usted, anhelan la unión más pura y profunda.</p>
                        <p>Con amor y anticipación,</p>
                        <p><strong>El Equipo de Maestro Horiochi</strong></p>
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


