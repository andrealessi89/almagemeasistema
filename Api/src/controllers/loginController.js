const loginModel = require('../models/loginModel');
const jwt = require('jsonwebtoken');

const login = async (request, response, database) => {
    console.log(request.body);
    try {
        const { email, senha } = request.body;
        if (!email || !senha) {
            return response.status(400).json({ message: 'Email ou senha não foram enviados' });
        }
        // Verifica as credenciais
        const login = await loginModel.login(email, senha, database);
        if (!login) {
            return response.status(401).json({ message: 'Email ou senha inválido' });
        }
        // Cria o token
        const token = jwt.sign({ email: login.email, nome_completo: login.nome_completo, create_time: login.create_time  }, process.env.JWT_SECRET_KEY , { expiresIn: process.env.JWT_TIME });
        response.status(200).json({ message:'Você Logou', token: token });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

module.exports = {
    login
};