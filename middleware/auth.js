const jwt = require('jsonwebtoken');
require('dotenv').config();
const ChaveToken = process.env.JWT_PRIVATE_KEY

const authenticateToken = (req, res, next) => {
    const token = req.header('token');
    if (!token) return res.status(401).send('Voce precisa fornecer um token');

    try {
        const decoded = jwt.verify(token, ChaveToken || 'jwtPrivateKey'); 
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('O token fornecido é inválido');
    }
};

module.exports = authenticateToken;