const jwt = require('jsonwebtoken');

const authenticate = (request, response, next) => {
    const token = request.headers['x-access-token'];

    if (!token) {
        return response.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
        if (error) {
            return response.status(401).json({ message: 'Token inválido' });
        }

        request.decoded = decoded;
        next();
    });

    
};

module.exports = {
    authenticate
};