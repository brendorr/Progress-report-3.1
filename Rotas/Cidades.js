const express = require('express');
const router = express.Router();
const Cidade = require('../models/Cidade');
const authenticateToken = require('../middleware/auth');

// criando uma cidade
router.post('/',authenticateToken, async (req, res) => {
    const { nome, estado } = req.body;
    try {
        const newCidade = new Cidade({ nome, estado });
        await newCidade.save();
        res.status(201).json(newCidade);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar cidade' });
    }
});

// Obtendo todas as cidades
router.get('/',authenticateToken, async (req, res) => {
    try {
        const cidades = await Cidade.find().select('-_id -__v');
        res.status(200).json(cidades);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cidades' });
    }
});

// consultar cidade pelo nome
router.get('/nome/:nome',authenticateToken, async (req, res) => {
    try {
        const cidades = await Cidade.find({ nome: req.params.nome }).select('-_id -__v');
        res.status(200).json(cidades);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cidade pelo nome' });
    }
});

// consultar cidade pelo estado
router.get('/estado/:estado',authenticateToken, async (req, res) => {
    try {
        const cidades = await Cidade.find({ estado: req.params.estado }).select('-_id -__v');
        res.status(200).json(cidades);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cidade pelo estado' });
    }
});

module.exports = router;
