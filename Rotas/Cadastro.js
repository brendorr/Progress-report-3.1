const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', (req, res) => {
    const { nome, senha } = req.body;

    // basta colocar qualquer coisa
    if (!nome || !senha) {
        return res.status(400).send('Nome e senha são obrigatórios.');
    }

    // gerando o token
    const token = jwt.sign({ nome }, process.env.JWT_PRIVATE_KEY || 'jwtPrivateKey', { expiresIn: '24h' });


    res.status(200).json({ token });
});

module.exports = router;