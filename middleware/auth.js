const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY || 'jwtPrivateKey');
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = authenticateToken;