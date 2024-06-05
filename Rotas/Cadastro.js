const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', (req, res) => {
    const { nome, senha } = req.body;

    // Aqui você pode adicionar lógica para salvar o cadastro no banco de dados, se necessário
    // ou verificar as credenciais de forma mais robusta.

    // Para simplificação, estamos apenas verificando se os campos estão presentes
    if (!nome || !senha) {
        return res.status(400).send('Nome e senha são obrigatórios.');
    }

    // Gera um token JWT
    const token = jwt.sign({ nome }, process.env.JWT_PRIVATE_KEY || 'jwtPrivateKey', { expiresIn: '1h' });

    // Retorna o token
    res.status(200).json({ token });
});

module.exports = router;