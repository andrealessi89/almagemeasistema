const nodemailer = require('nodemailer');

// Configuração do transporte SMTP com nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'noreply.almagemela@gmail.com', 
        pass: 'gpijorrwykjqxshx', 
    },
    from: 'noreply.almagemela@gmail.com',
});

// Função para enviar e-mail
const sendEmail = async ({ to, subject, textContent, htmlContent }) => {
    const mailOptions = {
        from: 'seuemail@gmail.com', // Remetente
        to: to, // Destinatário(s)
        subject: subject, // Assunto do e-mail
        text: textContent, // Corpo do e-mail em texto plano
        html: htmlContent, // Corpo do e-mail em HTML
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso: %s', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        return { success: false, error: error };
    }
};

module.exports = {
    sendEmail,
};
